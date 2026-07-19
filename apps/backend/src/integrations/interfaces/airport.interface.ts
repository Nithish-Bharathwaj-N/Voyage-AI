/**
 * Represents a single airport record.
 */
export interface AirportInfo {
  iataCode: string;
  icaoCode?: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  altitude?: number;
  type?: string;
}

/**
 * Contract for all airport information provider implementations.
 */
export interface IAirportProvider {
  getAirportByIata(iataCode: string): Promise<AirportInfo>;
  searchAirports(query: string): Promise<AirportInfo[]>;
  getAirportsByCity(city: string, countryCode?: string): Promise<AirportInfo[]>;
}

export const AIRPORT_PROVIDER = Symbol('IAirportProvider');
