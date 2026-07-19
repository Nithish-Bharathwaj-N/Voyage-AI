import { Injectable, Logger, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { PlannerContext, WeatherSummary } from '../dto/planner-context.dto';
import { PLACE_PROVIDER, IPlaceProvider } from '../../integrations/interfaces/place.interface';
import { GEOCODE_PROVIDER, IGeocodeProvider } from '../../integrations/interfaces/maps.interface';
import {
  WEATHER_PROVIDER,
  IWeatherProvider,
} from '../../integrations/interfaces/weather.interface';
import {
  TIMEZONE_PROVIDER,
  ITimezoneProvider,
} from '../../integrations/interfaces/timezone.interface';
import {
  COUNTRY_PROVIDER,
  ICountryProvider,
} from '../../integrations/interfaces/country.interface';
import {
  HOLIDAY_PROVIDER,
  IHolidayProvider,
} from '../../integrations/interfaces/holiday.interface';
import { EXCHANGE_RATE_PROVIDER, IExchangeRateProvider } from '../../integrations/interfaces/exchange.interface';
import { IMAGE_PROVIDER, IImagesProvider } from '../../integrations/interfaces/images.interface';
import { GeoIntelligenceService } from './geo-intelligence.service';
import { RankingEngineService } from './ranking-engine.service';
import { IntelligenceLayersService } from './intelligence-layers.service';
import { SeasonalEngineService } from './seasonal-engine.service';

/**
 * PlannerContextOrchestrator (Phase 3 upgrade)
 *
 * Phase 2: Fires all providers in parallel, returns typed PlannerContext.
 * Phase 3: Now fetches THREE place categories separately — attractions,
 *          restaurants, and museums — giving the prompt builder rich,
 *          categorized real-world data to inject into the LLM prompt.
 *
 * All calls run via Promise.allSettled() — never throws on partial failure.
 */
@Injectable()
export class PlannerContextOrchestrator {
  private readonly logger = new Logger(PlannerContextOrchestrator.name);

  constructor(
    @Inject(PLACE_PROVIDER) private readonly placeProvider: IPlaceProvider,
    @Inject(GEOCODE_PROVIDER) private readonly geocodeProvider: IGeocodeProvider,
    @Inject(WEATHER_PROVIDER) private readonly weatherProvider: IWeatherProvider,
    @Inject(TIMEZONE_PROVIDER) private readonly timezoneProvider: ITimezoneProvider,
    @Inject(COUNTRY_PROVIDER) private readonly countryProvider: ICountryProvider,
    @Inject(HOLIDAY_PROVIDER) private readonly holidayProvider: IHolidayProvider,
    @Inject(EXCHANGE_RATE_PROVIDER) private readonly exchangeProvider: IExchangeRateProvider,
    @Inject(IMAGE_PROVIDER) private readonly imagesProvider: IImagesProvider,
    private readonly geoIntelligence: GeoIntelligenceService,
    private readonly rankingEngine: RankingEngineService,
    private readonly intelligenceLayers: IntelligenceLayersService,
    private readonly seasonalEngine: SeasonalEngineService,
  ) {}

  async buildContext(dto: PlanTripDto): Promise<PlannerContext> {
    this.logger.log(`[ContextOrchestrator] Building context for: ${dto.destination}`);
    const startMs = Date.now();

    // ── Step 1: Geocode first — everything else depends on coordinates ──
    let geocodeResult = null;
    let coordinates = { latitude: 0, longitude: 0 };
    let countryCode = 'US';

    try {
      const geoResults = await this.geocodeProvider.geocode(dto.destination);
      if (geoResults && geoResults.length > 0) {
        geocodeResult = geoResults[0];
        coordinates = { latitude: geocodeResult.latitude, longitude: geocodeResult.longitude };
        countryCode = geocodeResult.countryCode || 'US';
        this.logger.debug(
          `Geocode: ${geocodeResult.formattedAddress} [${coordinates.latitude}, ${coordinates.longitude}]`,
        );
      }
    } catch (err) {
      this.logger.warn(`Geocode failed: ${(err as Error).message}`);
    }

    const hasCoords = coordinates.latitude !== 0;
    const tripYear = new Date(dto.startDate).getFullYear();
    const tripStart = new Date(dto.startDate);
    const tripEnd = new Date(dto.endDate);

    // ── Check Local Static JSON for Destination Data First ──
    const frontendDataPath = path.resolve(
      __dirname,
      '../../../../../../voyageai-frontend/public/data/destinations/India',
    );
    let staticDestData: any = null;
    
    try {
      if (fs.existsSync(frontendDataPath)) {
        // Read index to find the slug
        const indexPath = path.join(frontendDataPath, '../destinations-index.json');
        if (fs.existsSync(indexPath)) {
          const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
          const destEntry = indexData.find((d: any) => 
            d.name.toLowerCase() === dto.destination.toLowerCase() || 
            dto.destination.toLowerCase().includes(d.name.toLowerCase())
          );
          
          if (destEntry) {
            // Find the state folder
            const stateFolders = fs.readdirSync(frontendDataPath);
            for (const state of stateFolders) {
              const statePath = path.join(frontendDataPath, state);
              if (fs.statSync(statePath).isDirectory()) {
                const jsonPath = path.join(statePath, `${destEntry.slug}.json`);
                if (fs.existsSync(jsonPath)) {
                  staticDestData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
                  this.logger.log(`[ContextOrchestrator] Found rich static data for ${dto.destination}`);
                  break;
                }
              }
            }
          }
        }
      }
    } catch (err) {
      this.logger.warn(`Error reading static JSON for ${dto.destination}: ${err}`);
    }

    // ── Step 2: Fire ALL remaining calls in parallel ──
    const [
      weatherResult,
      attractionsResult,
      restaurantsResult,
      museumsResult,
      destinationImageResult,
      countryResult,
      timezoneResult,
      holidaysResult,
      exchangeResult,
    ] = await Promise.allSettled([
      // Weather
      hasCoords
        ? this.weatherProvider.getWeatherIntelligence(
            coordinates.latitude,
            coordinates.longitude,
            7,
          )
        : Promise.reject(new Error('No coordinates')),

      // Tourist attractions (top 15, 8km radius)
      staticDestData && staticDestData.topAttractions
        ? Promise.resolve(staticDestData.topAttractions.map((a: any) => ({
            name: a.name,
            address: a.location || staticDestData.name,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            rating: 4.8,
            types: ['tourist_attraction'],
            description: a.description
          })))
        : (hasCoords
            ? this.placeProvider.searchNearby({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                radiusMeters: 8000,
                type: 'tourist_attraction',
              })
            : Promise.resolve([])),

      // Restaurants (top 10, 3km radius)
      staticDestData && staticDestData.restaurants
        ? Promise.resolve(staticDestData.restaurants.map((r: any) => ({
            name: r.name,
            address: r.location || staticDestData.name,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            rating: r.rating || 4.5,
            types: ['restaurant'],
            description: r.description
          })))
        : (hasCoords
            ? this.placeProvider.searchNearby({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                radiusMeters: 3000,
                type: 'restaurant',
              })
            : Promise.resolve([])),

      // Museums (top 8, 8km radius)
      hasCoords
        ? this.placeProvider.searchNearby({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            radiusMeters: 8000,
            type: 'museum',
          })
        : Promise.resolve([]),

      // Destination hero image
      this.imagesProvider.searchImages({
        query: dto.destination,
        perPage: 1,
        orientation: 'landscape',
      }),

      // Country metadata
      this.countryProvider.getCountryByCode(countryCode),

      // Timezone
      hasCoords
        ? this.timezoneProvider.getTimezone(coordinates.latitude, coordinates.longitude)
        : Promise.reject(new Error('No coordinates')),

      // Holidays within trip window
      this.holidayProvider.getHolidays(countryCode, tripYear),

      // Exchange rates
      this.exchangeProvider.getRates('USD'),
    ]);

    // ── Step 3: Safely extract results ──
    const weather: WeatherSummary | null =
      weatherResult.status === 'fulfilled' && weatherResult.value
        ? {
            temperature: weatherResult.value.current.temperature,
            condition: weatherResult.value.current.condition,
            humidity: weatherResult.value.current.humidity,
            forecastText: weatherResult.value.daily?.[0]?.condition
              ? `${weatherResult.value.daily[0].condition} expected`
              : undefined,
          }
        : null;
    if (weatherResult.status === 'rejected') {
      this.logger.warn(`Weather failed: ${weatherResult.reason}`);
    }

    const attractions =
      attractionsResult.status === 'fulfilled' ? attractionsResult.value.slice(0, 15) : [];
    const restaurants =
      restaurantsResult.status === 'fulfilled' ? restaurantsResult.value.slice(0, 10) : [];
    const museums = museumsResult.status === 'fulfilled' ? museumsResult.value.slice(0, 8) : [];

    // ── AI RETRIEVAL ENGINE: Intelligence Layers Filtering ──
    const budgetPref = String(dto.budget || 'mid-range');
    
    // Apply intelligence layer filters before returning context
    const filteredAttractions = this.intelligenceLayers.filterByWeather(
      weather,
      this.intelligenceLayers.filterByBudget(attractions, budgetPref)
    );
    
    const filteredRestaurants = this.intelligenceLayers.filterByBudget(restaurants, budgetPref);
    
    const safetyWarnings = this.intelligenceLayers.filterBySafety(staticDestData);
    if (safetyWarnings.length > 0) {
       this.logger.warn(`Safety warnings detected for ${dto.destination}. Context augmented.`);
       if (staticDestData) {
         staticDestData.activeSafetyWarnings = safetyWarnings;
       }
    }

    // ── Geo-Intelligence: Smart Ranking of Nearby Hidden Gems ──
    let nearbyRankedGems: any[] = [];
    if (coordinates.latitude && coordinates.longitude && this.geoIntelligence) {
       const coordObj = { lat: coordinates.latitude, lng: coordinates.longitude };
       const nearbyRels = this.geoIntelligence.findNearbyDestinations(coordObj, 200, 10, dto.destination);
       const destObjs = nearbyRels.map(r => r.destination);
       // Rank them!
       const ranked = this.rankingEngine.rankDestinations(destObjs, dto);
       nearbyRankedGems = ranked.slice(0, 5); // Keep top 5 after ranking
    }

    return {
      geocode: geocodeResult,
      weather,
      places: [...filteredAttractions, ...filteredRestaurants, ...museums],
      attractions: filteredAttractions,
      restaurants: filteredRestaurants,
      museums,
      destinationImage: null,
      country: null,
      timezone: null,
      holidays: [],
      exchangeRate: null,
      staticKnowledge: staticDestData,
      nearbyHiddenGems: nearbyRankedGems,
      seasonalInsights: this.seasonalEngine.getSeasonalInsights(dto, staticDestData),
    };
  }
}
