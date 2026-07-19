import { Injectable, Logger } from '@nestjs/common';
import { ICountryProvider, CountryInfo } from '../interfaces/country.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';

const PROVIDER = 'CountryService';
const RESTCOUNTRIES_BASE = 'https://restcountries.com/v3.1';
const CACHE_TTL = 86400 * 7; // 7 days — country data rarely changes

interface RestCountryRaw {
  name: { common: string; official: string };
  cca2: string;
  cca3: string;
  ccn3?: string;
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  currencies?: Record<string, unknown>;
  languages?: Record<string, string>;
  timezones?: string[];
  latlng?: [number, number];
  flag?: string;
  idd?: { root?: string; suffixes?: string[] };
}

/**
 * Country information provider backed by the free RestCountries v3 API.
 * No API key required. Data is cached for 7 days.
 */
@Injectable()
export class CountryService implements ICountryProvider {
  private readonly logger = new Logger(PROVIDER);

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async getCountryByCode(code: string): Promise<CountryInfo> {
    const cacheKey = CacheService.buildKey('country', 'code', code.toUpperCase());
    const cached = await this.cacheService.get<CountryInfo>(cacheKey);
    if (cached) return cached;

    const url = `${RESTCOUNTRIES_BASE}/alpha/${encodeURIComponent(code)}`;
    const response = await this.httpService.get<RestCountryRaw[]>(PROVIDER, url);

    const result = this.mapCountry(response.data[0]);
    await this.cacheService.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async searchCountries(query: string): Promise<CountryInfo[]> {
    const cacheKey = CacheService.buildKey('country', 'search', encodeURIComponent(query));
    const cached = await this.cacheService.get<CountryInfo[]>(cacheKey);
    if (cached) return cached;

    const url = `${RESTCOUNTRIES_BASE}/name/${encodeURIComponent(query)}`;
    const response = await this.httpService.get<RestCountryRaw[]>(PROVIDER, url);
    const results = response.data.map(this.mapCountry);
    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  async getAllCountries(): Promise<CountryInfo[]> {
    const cacheKey = CacheService.buildKey('country', 'all');
    const cached = await this.cacheService.get<CountryInfo[]>(cacheKey);
    if (cached) return cached;

    const url = `${RESTCOUNTRIES_BASE}/all?fields=name,cca2,cca3,ccn3,capital,region,subregion,population,currencies,languages,timezones,latlng,flag,idd`;
    const response = await this.httpService.get<RestCountryRaw[]>(PROVIDER, url);
    const results = response.data.map(this.mapCountry);
    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  private mapCountry(raw: RestCountryRaw): CountryInfo {
    const callingRoot = raw.idd?.root ?? '';
    const callingSuffix = raw.idd?.suffixes?.[0] ?? '';
    return {
      name: raw.name.common,
      officialName: raw.name.official,
      code: raw.cca2,
      code3: raw.cca3,
      numeric: raw.ccn3 ?? '',
      capital: raw.capital?.[0],
      region: raw.region,
      subregion: raw.subregion,
      population: raw.population,
      currencies: raw.currencies ? Object.keys(raw.currencies) : [],
      languages: raw.languages ? Object.values(raw.languages) : [],
      timezones: raw.timezones ?? [],
      latitude: raw.latlng?.[0],
      longitude: raw.latlng?.[1],
      flagEmoji: raw.flag,
      callingCode: callingRoot && callingSuffix ? `${callingRoot}${callingSuffix}` : undefined,
    };
  }
}
