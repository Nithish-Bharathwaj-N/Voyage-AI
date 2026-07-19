/**
 * Represents country information.
 */
export interface CountryInfo {
  name: string;
  officialName: string;
  code: string; // ISO 3166-1 alpha-2
  code3: string; // ISO 3166-1 alpha-3
  numeric: string;
  capital?: string;
  region?: string;
  subregion?: string;
  population?: number;
  currencies: string[];
  languages: string[];
  timezones: string[];
  latitude?: number;
  longitude?: number;
  flagEmoji?: string;
  callingCode?: string;
}

/**
 * Contract for all country information provider implementations.
 */
export interface ICountryProvider {
  getCountryByCode(code: string): Promise<CountryInfo>;
  searchCountries(query: string): Promise<CountryInfo[]>;
  getAllCountries(): Promise<CountryInfo[]>;
}

export const COUNTRY_PROVIDER = Symbol('ICountryProvider');
