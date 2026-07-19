import { Injectable, Logger } from '@nestjs/common';
import { IAirportProvider, AirportInfo } from '../interfaces/airport.interface';
import { CacheService } from './cache.service';
import { NotFoundException } from '@nestjs/common';

const PROVIDER = 'AirportService';
const CACHE_TTL = 86400 * 30; // 30 days — airport data is static

/**
 * Airport information provider with built-in database of major global hubs
 * and query matching logic.
 */
@Injectable()
export class AirportService implements IAirportProvider {
  private readonly logger = new Logger(PROVIDER);

  // Core global hub airports dictionary
  private readonly airportsDb: AirportInfo[] = [
    {
      iataCode: 'CDG',
      icaoCode: 'LFPG',
      name: 'Charles de Gaulle Airport',
      city: 'Paris',
      country: 'France',
      countryCode: 'FR',
      latitude: 49.0097,
      longitude: 2.5479,
      timezone: 'Europe/Paris',
    },
    {
      iataCode: 'ORY',
      icaoCode: 'LFPO',
      name: 'Orly Airport',
      city: 'Paris',
      country: 'France',
      countryCode: 'FR',
      latitude: 48.7262,
      longitude: 2.3652,
      timezone: 'Europe/Paris',
    },
    {
      iataCode: 'JFK',
      icaoCode: 'KJFK',
      name: 'John F. Kennedy International Airport',
      city: 'New York',
      country: 'United States',
      countryCode: 'US',
      latitude: 40.6398,
      longitude: -73.7789,
      timezone: 'America/New_York',
    },
    {
      iataCode: 'LHR',
      icaoCode: 'EGLL',
      name: 'London Heathrow Airport',
      city: 'London',
      country: 'United Kingdom',
      countryCode: 'GB',
      latitude: 51.4706,
      longitude: -0.4619,
      timezone: 'Europe/London',
    },
    {
      iataCode: 'SIN',
      icaoCode: 'WSSS',
      name: 'Singapore Changi Airport',
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      latitude: 1.3644,
      longitude: 103.9915,
      timezone: 'Asia/Singapore',
    },
    {
      iataCode: 'DXB',
      icaoCode: 'OMDB',
      name: 'Dubai International Airport',
      city: 'Dubai',
      country: 'United Arab Emirates',
      countryCode: 'AE',
      latitude: 25.2532,
      longitude: 55.3657,
      timezone: 'Asia/Dubai',
    },
    {
      iataCode: 'HND',
      icaoCode: 'RJTT',
      name: 'Tokyo Haneda Airport',
      city: 'Tokyo',
      country: 'Japan',
      countryCode: 'JP',
      latitude: 35.5494,
      longitude: 139.7798,
      timezone: 'Asia/Tokyo',
    },
  ];

  constructor(private readonly cacheService: CacheService) {}

  async getAirportByIata(iataCode: string): Promise<AirportInfo> {
    const code = iataCode.toUpperCase();
    const cacheKey = CacheService.buildKey('airport', 'iata', code);
    const cached = await this.cacheService.get<AirportInfo>(cacheKey);
    if (cached) return cached;

    const airport = this.airportsDb.find((a) => a.iataCode === code);
    if (!airport) {
      this.logger.warn(`Airport with IATA code ${code} not found in database`);
      throw new NotFoundException(`Airport with IATA code ${code} not found`);
    }

    await this.cacheService.set(cacheKey, airport, CACHE_TTL);
    return airport;
  }

  async searchAirports(query: string): Promise<AirportInfo[]> {
    const term = query.toLowerCase();
    const cacheKey = CacheService.buildKey('airport', 'search', term);
    const cached = await this.cacheService.get<AirportInfo[]>(cacheKey);
    if (cached) return cached;

    const results = this.airportsDb.filter(
      (a) =>
        a.iataCode.toLowerCase().includes(term) ||
        a.name.toLowerCase().includes(term) ||
        a.city.toLowerCase().includes(term) ||
        a.country.toLowerCase().includes(term),
    );

    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  async getAirportsByCity(city: string, countryCode?: string): Promise<AirportInfo[]> {
    const cityName = city.toLowerCase();
    const cCode = countryCode?.toUpperCase();
    const cacheKey = CacheService.buildKey('airport', 'city', cityName, cCode || '');
    const cached = await this.cacheService.get<AirportInfo[]>(cacheKey);
    if (cached) return cached;

    const results = this.airportsDb.filter((a) => {
      const matchCity = a.city.toLowerCase() === cityName;
      const matchCountry = cCode ? a.countryCode === cCode : true;
      return matchCity && matchCountry;
    });

    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }
}
