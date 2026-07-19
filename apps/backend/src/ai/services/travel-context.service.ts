import { Injectable, Logger, Inject } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';
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
import {
  AIRPORT_PROVIDER,
  IAirportProvider,
} from '../../integrations/interfaces/airport.interface';
import {
  EXCHANGE_RATE_PROVIDER,
  IExchangeRateProvider,
} from '../../integrations/interfaces/exchange.interface';

@Injectable()
export class TravelContextService {
  private readonly logger = new Logger(TravelContextService.name);

  constructor(
    @Inject(PLACE_PROVIDER) private readonly placeProvider: IPlaceProvider,
    @Inject(GEOCODE_PROVIDER) private readonly geocodeProvider: IGeocodeProvider,
    @Inject(WEATHER_PROVIDER) private readonly weatherProvider: IWeatherProvider,
    @Inject(TIMEZONE_PROVIDER) private readonly timezoneProvider: ITimezoneProvider,
    @Inject(COUNTRY_PROVIDER) private readonly countryProvider: ICountryProvider,
    @Inject(HOLIDAY_PROVIDER) private readonly holidayProvider: IHolidayProvider,
    @Inject(AIRPORT_PROVIDER) private readonly airportProvider: IAirportProvider,
    @Inject(EXCHANGE_RATE_PROVIDER) private readonly exchangeProvider: IExchangeRateProvider,
  ) {}

  /**
   * Orchestrates queries to the integrations layer and compiles a markdown summary of live context.
   */
  async buildContext(dto: PlanTripDto): Promise<string> {
    this.logger.log(`Building live travel context for destination: ${dto.destination}`);

    let geocodeSummary = 'Location details: Not resolved.';
    let coordinates = { latitude: 0, longitude: 0 };
    let countryCode = 'US';

    // 1. Geocode Destination
    try {
      const geo = await this.geocodeProvider.geocode(dto.destination);
      if (geo && geo.length > 0) {
        coordinates = { latitude: geo[0].latitude, longitude: geo[0].longitude };
        countryCode = geo[0].countryCode || 'US';
        geocodeSummary = `Location Resolved: "${geo[0].formattedAddress}" (Lat: ${geo[0].latitude}, Lng: ${geo[0].longitude})`;
      }
    } catch (err) {
      this.logger.warn(`Failed to geocode destination: ${(err as Error).message}`);
    }

    // 2. Weather
    let weatherSummary = 'Weather Forecast: Not available.';
    try {
      if (coordinates.latitude !== 0) {
        const weather = await this.weatherProvider.getWeatherIntelligence(
          coordinates.latitude,
          coordinates.longitude,
          1,
        );
        weatherSummary = `Current Temperature: ${weather.current.temperature}°C, Conditions: ${weather.current.condition || 'clear'}`;
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch weather context: ${(err as Error).message}`);
    }

    // 3. Timezone
    let timezoneSummary = 'Timezone: UTC';
    try {
      if (coordinates.latitude !== 0) {
        const tz = await this.timezoneProvider.getTimezone(
          coordinates.latitude,
          coordinates.longitude,
        );
        timezoneSummary = `Timezone: ${tz.timezoneId} (Offset: UTC${tz.offsetHours >= 0 ? '+' : ''}${tz.offsetHours})`;
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch timezone context: ${(err as Error).message}`);
    }

    // 4. Country & Currency Exchange Rates
    let exchangeSummary = `Exchange Rate: 1 USD = 1 ${dto.currency || 'USD'}`;
    let countrySummary = `Country Code: ${countryCode}`;
    try {
      const country = await this.countryProvider.getCountryByCode(countryCode);
      countrySummary = `Country: ${country.name} (Official: ${country.officialName}, Capital: ${country.capital || 'N/A'}, Languages: ${country.languages.join(', ')})`;
      if (dto.currency && dto.currency !== 'USD') {
        const rates = await this.exchangeProvider.getRates('USD');
        if (rates.rates[dto.currency]) {
          exchangeSummary = `Exchange Rate: 1 USD = ${rates.rates[dto.currency]} ${dto.currency}`;
        }
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch country/currency context: ${(err as Error).message}`);
    }

    // 5. Public Holidays
    let holidaySummary = 'Holidays: No public holidays in planning period.';
    try {
      const year = new Date(dto.startDate).getFullYear();
      const holidays = await this.holidayProvider.getHolidays(countryCode, year);
      const tripStart = new Date(dto.startDate);
      const tripEnd = new Date(dto.endDate);

      const matchedHolidays = holidays.filter((h) => {
        const hDate = new Date(h.date);
        return hDate >= tripStart && hDate <= tripEnd;
      });

      if (matchedHolidays.length > 0) {
        holidaySummary = `Holidays during trip: ${matchedHolidays.map((h) => `${h.date}: ${h.name}`).join(', ')}`;
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch holidays context: ${(err as Error).message}`);
    }

    // 6. Nearby POIs (Candidate activities)
    let placesSummary = 'Candidate Attractions: None found nearby.';
    try {
      if (coordinates.latitude !== 0) {
        const pois = await this.placeProvider.searchNearby({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          radiusMeters: 5000,
          type: 'tourist_attraction',
        });
        if (pois.length > 0) {
          placesSummary = `Attractions nearby: ${pois
            .slice(0, 10)
            .map((p) => `${p.name} (Rating: ${p.rating || 'N/A'})`)
            .join('; ')}`;
        }
      }
    } catch (err) {
      this.logger.warn(`Failed to fetch nearby attractions context: ${(err as Error).message}`);
    }

    // Compile into final context markdown
    return `
- Geocoding Context: ${geocodeSummary}
- Timezone Context: ${timezoneSummary}
- Weather Context: ${weatherSummary}
- Country Metadata: ${countrySummary}
- Currency Exchange Rates: ${exchangeSummary}
- Local Calendar (Holidays): ${holidaySummary}
- Candidate Local Attractions: ${placesSummary}
`.trim();
  }
}
