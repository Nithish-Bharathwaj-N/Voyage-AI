import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITimezoneProvider, TimezoneInfo } from '../interfaces/timezone.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';

const PROVIDER = 'TimezoneService';
const TZDB_BASE = 'http://api.timezonedb.com/v2.1';
const CACHE_TTL = 86400; // 24 hours — timezone data is very stable

interface TimeZoneDBResponse {
  status: string;
  message?: string;
  zoneName: string;
  abbreviation: string;
  gmtOffset: number;
  dst: string;
  dstStart?: string;
  dstEnd?: string;
  timestamp: number;
  countryCode?: string;
  countryName?: string;
}

/**
 * Timezone provider backed by TimezoneDB API (free plan available).
 * Also supports lookup by coordinate using reverse geocode.
 * Degrades gracefully if TIMEZONE_API_KEY is absent — returns UTC-based estimate.
 */
@Injectable()
export class TimezoneService implements ITimezoneProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('integrations.timezoneApiKey');
    if (!this.apiKey) {
      this.logger.warn(
        'TIMEZONE_API_KEY not configured — TimezoneService will operate in fallback mode',
      );
    }
  }

  async getTimezone(lat: number, lng: number, _timestamp?: Date): Promise<TimezoneInfo> {
    const cacheKey = CacheService.buildKey('timezone', 'coord', String(lat), String(lng));
    const cached = await this.cacheService.get<TimezoneInfo>(cacheKey);
    if (cached) return cached;

    this.logger.debug(
      `Fetching timezone for lat: ${lat}, lng: ${lng} at time: ${_timestamp?.toISOString()}`,
    );

    if (!this.apiKey) {
      this.logger.warn('TIMEZONE_API_KEY not configured — returning UTC fallback');
      return this.utcFallback(lat, lng);
    }

    const url = `${TZDB_BASE}/get-time-zone?key=${this.apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
    const response = await this.httpService.get<TimeZoneDBResponse>(PROVIDER, url);

    if (response.data.status !== 'OK') {
      this.logger.warn(`TimezoneDB error: ${response.data.message} — returning UTC fallback`);
      return this.utcFallback(lat, lng);
    }

    const result = this.mapResponse(response.data);
    await this.cacheService.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  async getTimezoneById(timezoneId: string): Promise<TimezoneInfo> {
    const cacheKey = CacheService.buildKey('timezone', 'id', timezoneId);
    const cached = await this.cacheService.get<TimezoneInfo>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      return this.utcFallback(0, 0);
    }

    const url = `${TZDB_BASE}/get-time-zone?key=${this.apiKey}&format=json&by=zone&zone=${encodeURIComponent(timezoneId)}`;
    const response = await this.httpService.get<TimeZoneDBResponse>(PROVIDER, url);
    const result = this.mapResponse(response.data);
    await this.cacheService.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  private mapResponse(raw: TimeZoneDBResponse): TimezoneInfo {
    const offsetHours = Math.floor(raw.gmtOffset / 3600);
    const offsetMinutes = Math.abs(Math.floor((raw.gmtOffset % 3600) / 60));
    return {
      timezoneId: raw.zoneName,
      abbreviation: raw.abbreviation,
      offsetHours,
      offsetMinutes,
      isDst: raw.dst === '1',
      gmtOffset: raw.gmtOffset,
      countryCode: raw.countryCode,
      countryName: raw.countryName,
      zoneName: raw.zoneName,
      timestamp: new Date(raw.timestamp * 1000),
    };
  }

  private utcFallback(lat: number, lng: number): TimezoneInfo {
    this.logger.warn(`Returning UTC fallback timezone for coordinates: ${lat}, ${lng}`);
    return {
      timezoneId: 'UTC',
      abbreviation: 'UTC',
      offsetHours: 0,
      offsetMinutes: 0,
      isDst: false,
      gmtOffset: 0,
      timestamp: new Date(),
    };
  }
}
