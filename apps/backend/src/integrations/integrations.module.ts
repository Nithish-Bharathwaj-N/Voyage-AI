import { Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { HttpService } from './services/http.service';
import { PlacesService } from './services/places.service';
import { GeocodeService } from './services/geocode.service';
import { WeatherService } from './services/weather.service';
import { ExchangeService } from './services/exchange.service';
import { TimezoneService } from './services/timezone.service';
import { AirportService } from './services/airport.service';
import { CountryService } from './services/country.service';
import { HolidayService } from './services/holiday.service';
import { RoutingService } from './services/routing.service';
import { DistanceMatrixService } from './services/distance-matrix.service';
import { MapService } from './services/map.service';
import { StaticMapService } from './services/static-map.service';
import { MapsIntelligenceService } from './services/maps-intelligence.service';
import { UnsplashService } from './services/unsplash.service';

import { PLACE_PROVIDER } from './interfaces/place.interface';
import {
  GEOCODE_PROVIDER,
  ROUTING_PROVIDER,
  DISTANCE_MATRIX_PROVIDER,
  MAP_PROVIDER,
  STATIC_MAP_PROVIDER,
  MAPS_INTELLIGENCE_PROVIDER,
} from './interfaces/maps.interface';
import { WEATHER_PROVIDER } from './interfaces/weather.interface';
import { EXCHANGE_RATE_PROVIDER } from './interfaces/exchange.interface';
import { TIMEZONE_PROVIDER } from './interfaces/timezone.interface';
import { AIRPORT_PROVIDER } from './interfaces/airport.interface';
import { COUNTRY_PROVIDER } from './interfaces/country.interface';
import { HOLIDAY_PROVIDER } from './interfaces/holiday.interface';
import { IMAGE_PROVIDER } from './interfaces/images.interface';

import { ExploreController } from './controllers/explore.controller';
import { WeatherController } from './controllers/weather.controller';
import { MapsController } from './controllers/maps.controller';
import { ImagesController } from './controllers/images.controller';

@Module({
  controllers: [ExploreController, WeatherController, MapsController, ImagesController],
  providers: [
    CacheService,
    HttpService,
    PlacesService,
    GeocodeService,
    WeatherService,
    ExchangeService,
    TimezoneService,
    AirportService,
    CountryService,
    HolidayService,
    RoutingService,
    DistanceMatrixService,
    MapService,
    StaticMapService,
    MapsIntelligenceService,
    UnsplashService,
    // Provide under interface token symbols for loose coupling
    {
      provide: PLACE_PROVIDER,
      useClass: PlacesService,
    },
    {
      provide: GEOCODE_PROVIDER,
      useClass: GeocodeService,
    },
    {
      provide: ROUTING_PROVIDER,
      useClass: RoutingService,
    },
    {
      provide: DISTANCE_MATRIX_PROVIDER,
      useClass: DistanceMatrixService,
    },
    {
      provide: MAP_PROVIDER,
      useClass: MapService,
    },
    {
      provide: STATIC_MAP_PROVIDER,
      useClass: StaticMapService,
    },
    {
      provide: MAPS_INTELLIGENCE_PROVIDER,
      useClass: MapsIntelligenceService,
    },
    {
      provide: WEATHER_PROVIDER,
      useClass: WeatherService,
    },
    {
      provide: EXCHANGE_RATE_PROVIDER,
      useClass: ExchangeService,
    },
    {
      provide: TIMEZONE_PROVIDER,
      useClass: TimezoneService,
    },
    {
      provide: AIRPORT_PROVIDER,
      useClass: AirportService,
    },
    {
      provide: COUNTRY_PROVIDER,
      useClass: CountryService,
    },
    {
      provide: HOLIDAY_PROVIDER,
      useClass: HolidayService,
    },
    {
      provide: IMAGE_PROVIDER,
      useClass: UnsplashService,
    },
  ],
  exports: [
    CacheService,
    HttpService,
    PLACE_PROVIDER,
    GEOCODE_PROVIDER,
    ROUTING_PROVIDER,
    DISTANCE_MATRIX_PROVIDER,
    MAP_PROVIDER,
    STATIC_MAP_PROVIDER,
    MAPS_INTELLIGENCE_PROVIDER,
    WEATHER_PROVIDER,
    EXCHANGE_RATE_PROVIDER,
    TIMEZONE_PROVIDER,
    AIRPORT_PROVIDER,
    COUNTRY_PROVIDER,
    HOLIDAY_PROVIDER,
    IMAGE_PROVIDER,
    UnsplashService,
  ],
})
export class IntegrationsModule {}
