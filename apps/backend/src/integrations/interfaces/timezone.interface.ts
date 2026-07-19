/**
 * Represents timezone information for a geographic location.
 */
export interface TimezoneInfo {
  timezoneId: string;
  abbreviation: string;
  offsetHours: number;
  offsetMinutes: number;
  isDst: boolean;
  dstOffset?: number;
  countryCode?: string;
  countryName?: string;
  zoneName?: string;
  gmtOffset: number;
  timestamp: Date;
}

/**
 * Contract for all timezone provider implementations.
 */
export interface ITimezoneProvider {
  getTimezone(lat: number, lng: number, timestamp?: Date): Promise<TimezoneInfo>;
  getTimezoneById(timezoneId: string): Promise<TimezoneInfo>;
}

export const TIMEZONE_PROVIDER = Symbol('ITimezoneProvider');
