/**
 * Represents public holiday information.
 */
export interface PublicHoliday {
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  name: string;
  localName: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[];
  launchYear?: number;
  types: string[];
}

/**
 * Contract for all holiday data provider implementations.
 */
export interface IHolidayProvider {
  getHolidays(countryCode: string, year: number): Promise<PublicHoliday[]>;
  isHoliday(countryCode: string, date: string): Promise<boolean>;
}

export const HOLIDAY_PROVIDER = Symbol('IHolidayProvider');
