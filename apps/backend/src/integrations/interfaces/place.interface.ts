/**
 * Represents a single place / point of interest result.
 */
export interface PlaceResult {
  placeId: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  rating?: number;
  types?: string[];
  photoReference?: string;
  openNow?: boolean;
  priceLevel?: number;
  reviewCount?: number;
  website?: string;
  openingHours?: string[]; // Array of weekday_text from Google Places
  url?: string; // Google Maps URL
}

/**
 * Options for searching nearby places.
 */
export interface PlaceSearchOptions {
  latitude: number;
  longitude: number;
  radiusMeters: number;
  type?: string;
  keyword?: string;
  language?: string;
}

/**
 * Contract for all places / points-of-interest provider implementations.
 */
export interface IPlaceProvider {
  searchNearby(options: PlaceSearchOptions): Promise<PlaceResult[]>;
  searchByText(query: string, language?: string): Promise<PlaceResult[]>;
  getPlaceDetails(placeId: string): Promise<PlaceResult>;
}

export const PLACE_PROVIDER = Symbol('IPlaceProvider');
