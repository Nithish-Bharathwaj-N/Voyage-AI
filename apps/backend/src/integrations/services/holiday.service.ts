import { Injectable, Logger } from '@nestjs/common';
import { IHolidayProvider, PublicHoliday } from '../interfaces/holiday.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';

const PROVIDER = 'HolidayService';
const NAGER_BASE = 'https://date.nager.at/api/v3';
const CACHE_TTL = 86400 * 7; // 7 days — holiday records are static

interface NagerHoliday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

/**
 * Holiday provider backed by the free, open-source Nager.Date API.
 * No API key required. Supports 100+ countries.
 */
@Injectable()
export class HolidayService implements IHolidayProvider {
  private readonly logger = new Logger(PROVIDER);

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
  ) {}

  async getHolidays(countryCode: string, year: number): Promise<PublicHoliday[]> {
    const code = countryCode.toUpperCase();
    const cacheKey = CacheService.buildKey('holiday', code, String(year));
    const cached = await this.cacheService.get<PublicHoliday[]>(cacheKey);
    if (cached) return cached;

    const url = `${NAGER_BASE}/PublicHolidays/${year}/${code}`;
    const response = await this.httpService.get<NagerHoliday[]>(PROVIDER, url);

    const results = response.data.map(this.mapHoliday);
    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  async isHoliday(countryCode: string, date: string): Promise<boolean> {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return false;
    }

    const year = dateObj.getFullYear();
    const targetDate = date.substring(0, 10); // YYYY-MM-DD
    const holidays = await this.getHolidays(countryCode, year);

    return holidays.some((h) => h.date === targetDate);
  }

  private mapHoliday(raw: NagerHoliday): PublicHoliday {
    return {
      date: raw.date,
      name: raw.name,
      localName: raw.localName,
      countryCode: raw.countryCode,
      fixed: raw.fixed,
      global: raw.global,
      counties: raw.counties || undefined,
      launchYear: raw.launchYear || undefined,
      types: raw.types,
    };
  }
}
