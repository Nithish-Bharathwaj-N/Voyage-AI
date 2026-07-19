import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IPlaceProvider, PlaceResult, PlaceSearchOptions } from '../interfaces/place.interface';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'PlacesService';
const CACHE_TTL = 86400; // 24 hours

interface GooglePlacesTextSearchResponse {
  results: {
    place_id: string;
    name: string;
    formatted_address?: string;
    geometry: { location: { lat: number; lng: number } };
    rating?: number;
    types?: string[];
    opening_hours?: { open_now?: boolean };
    price_level?: number;
  }[];
  status: string;
}

interface GooglePlaceDetailsResponse {
  result: {
    place_id: string;
    name: string;
    formatted_address?: string;
    geometry: { location: { lat: number; lng: number } };
    rating?: number;
    user_ratings_total?: number;
    website?: string;
    url?: string;
    types?: string[];
    opening_hours?: { open_now?: boolean; weekday_text?: string[] };
    price_level?: number;
    photos?: { photo_reference: string }[];
  };
  status: string;
}

interface OTMPlace {
  xid: string;
  name?: string;
  point: { lat: number; lon: number };
  rate?: number;
  kinds?: string;
  address?: { road?: string; city?: string };
}

/**
 * Places service backed by Google Places API (or OpenTripMap fallback).
 * Requires GOOGLE_PLACES_API_KEY in environment.
 * Degrades to mock/fallback results if no key is configured, avoiding hard failures.
 */
@Injectable()
export class PlacesService implements IPlaceProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly apiKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('integrations.googlePlacesApiKey');
    if (!this.apiKey) {
      this.logger.warn(
        'GOOGLE_PLACES_API_KEY not configured — PlacesService will operate in fallback mode',
      );
    }
  }

  async searchNearby(options: PlaceSearchOptions): Promise<PlaceResult[]> {
    const cacheKey = CacheService.buildKey(
      'places',
      'nearby',
      String(options.latitude),
      String(options.longitude),
      String(options.radiusMeters),
      options.type || '',
      options.keyword || '',
    );

    const cached = await this.cacheService.get<PlaceResult[]>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      this.logger.debug('No API key configured for Google Places — using OpenTripMap fallback');
      const fallback = await this.getOpenTripMapFallback(options);
      await this.cacheService.set(cacheKey, fallback, CACHE_TTL);
      return fallback;
    }

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${options.latitude},${options.longitude}&radius=${options.radiusMeters}&key=${this.apiKey}`;
    if (options.type) url += `&type=${options.type}`;
    if (options.keyword) url += `&keyword=${encodeURIComponent(options.keyword)}`;

    const response = await this.httpService.get<GooglePlacesTextSearchResponse>(PROVIDER, url);

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new ProviderUnavailableException(
        PROVIDER,
        `Google Places API returned status ${response.data.status}`,
      );
    }

    const results = (response.data.results || []).map((p) => ({
      placeId: p.place_id,
      name: p.name,
      address: p.formatted_address,
      latitude: p.geometry.location.lat,
      longitude: p.geometry.location.lng,
      rating: p.rating,
      types: p.types,
      openNow: p.opening_hours?.open_now,
      priceLevel: p.price_level,
    }));

    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  async searchByText(query: string, language?: string): Promise<PlaceResult[]> {
    const cacheKey = CacheService.buildKey(
      'places',
      'text',
      encodeURIComponent(query),
      language || '',
    );
    const cached = await this.cacheService.get<PlaceResult[]>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      this.logger.debug(
        'No API key configured for Google Places — using OpenTripMap text search fallback',
      );
      const fallback = await this.getOpenTripMapTextFallback(query);
      await this.cacheService.set(cacheKey, fallback, CACHE_TTL);
      return fallback;
    }

    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${this.apiKey}`;
    if (language) url += `&language=${language}`;

    const response = await this.httpService.get<GooglePlacesTextSearchResponse>(PROVIDER, url);

    if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
      throw new ProviderUnavailableException(
        PROVIDER,
        `Google Places API returned status ${response.data.status}`,
      );
    }

    const results = (response.data.results || []).map((p) => ({
      placeId: p.place_id,
      name: p.name,
      address: p.formatted_address,
      latitude: p.geometry.location.lat,
      longitude: p.geometry.location.lng,
      rating: p.rating,
      types: p.types,
      openNow: p.opening_hours?.open_now,
      priceLevel: p.price_level,
    }));

    await this.cacheService.set(cacheKey, results, CACHE_TTL);
    return results;
  }

  async getPlaceDetails(placeId: string): Promise<PlaceResult> {
    const cacheKey = CacheService.buildKey('places', 'details', placeId);
    const cached = await this.cacheService.get<PlaceResult>(cacheKey);
    if (cached) return cached;

    if (!this.apiKey) {
      this.logger.debug(
        'No API key configured for Google Places — using OpenTripMap details fallback',
      );
      const fallback = await this.getOpenTripMapDetailsFallback(placeId);
      await this.cacheService.set(cacheKey, fallback, CACHE_TTL);
      return fallback;
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,rating,user_ratings_total,website,url,opening_hours,photos,geometry,type,price_level,formatted_address&key=${this.apiKey}`;
    const response = await this.httpService.get<GooglePlaceDetailsResponse>(PROVIDER, url);

    if (response.data.status !== 'OK') {
      throw new ProviderUnavailableException(
        PROVIDER,
        `Google Places Details returned status ${response.data.status}`,
      );
    }

    const p = response.data.result;
    const result: PlaceResult = {
      placeId: p.place_id,
      name: p.name,
      address: p.formatted_address,
      latitude: p.geometry.location.lat,
      longitude: p.geometry.location.lng,
      rating: p.rating,
      types: p.types,
      openNow: p.opening_hours?.open_now,
      priceLevel: p.price_level,
      reviewCount: p.user_ratings_total,
      website: p.website,
      url: p.url,
      openingHours: p.opening_hours?.weekday_text,
      photoReference: p.photos && p.photos.length > 0 ? p.photos[0].photo_reference : undefined,
    };

    await this.cacheService.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  private async getOpenTripMapFallback(options: PlaceSearchOptions): Promise<PlaceResult[]> {
    const otmKey = this.configService.get<string>('integrations.openTripMapApiKey');
    if (!otmKey) {
      throw new ProviderUnavailableException(
        PROVIDER,
        'No Google Places API key and no OpenTripMap API key configured',
      );
    }

    const radius = Math.min(options.radiusMeters || 5000, 20000); // max 20km for OTM
    let kinds = 'interesting_places';

    // Map internal types to OTM kinds
    if (options.type === 'restaurant') kinds = 'foods';
    if (options.type === 'museum') kinds = 'museums';
    if (options.type === 'cafe') kinds = 'cafes';
    if (options.type === 'nightlife') kinds = 'nightclubs';

    const url = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${options.longitude}&lat=${options.latitude}&kinds=${kinds}&format=json&apikey=${otmKey}`;

    const response = await this.httpService.get<OTMPlace[]>(PROVIDER, url);
    if (!Array.isArray(response.data)) {
      throw new ProviderUnavailableException(PROVIDER, 'OpenTripMap API returned invalid response');
    }

    return response.data
      .slice(0, 20)
      .map((p) => ({
        placeId: p.xid,
        name: p.name || 'Unnamed Place',
        latitude: p.point.lat,
        longitude: p.point.lon,
        rating: p.rate,
        types: p.kinds ? p.kinds.split(',') : [kinds],
        openNow: undefined,
        priceLevel: undefined,
      }))
      .filter((p) => p.name !== 'Unnamed Place');
  }

  private async getOpenTripMapTextFallback(query: string): Promise<PlaceResult[]> {
    const otmKey = this.configService.get<string>('integrations.openTripMapApiKey');
    if (!otmKey) {
      throw new ProviderUnavailableException(
        PROVIDER,
        'No Google Places API key and no OpenTripMap API key configured',
      );
    }

    const url = `https://api.opentripmap.com/0.1/en/places/autosuggest?name=${encodeURIComponent(query)}&format=json&apikey=${otmKey}`;
    const response = await this.httpService.get<OTMPlace[]>(PROVIDER, url);

    if (!Array.isArray(response.data)) {
      throw new ProviderUnavailableException(PROVIDER, 'OpenTripMap API returned invalid response');
    }

    return response.data.slice(0, 10).map((p) => ({
      placeId: p.xid,
      name: p.name || 'Unnamed Place',
      latitude: p.point.lat,
      longitude: p.point.lon,
      rating: p.rate,
      types: p.kinds ? p.kinds.split(',') : [],
      openNow: undefined,
      priceLevel: undefined,
    }));
  }

  private async getOpenTripMapDetailsFallback(placeId: string): Promise<PlaceResult> {
    const otmKey = this.configService.get<string>('integrations.openTripMapApiKey');
    if (!otmKey) {
      throw new ProviderUnavailableException(
        PROVIDER,
        'No Google Places API key and no OpenTripMap API key configured',
      );
    }

    const url = `https://api.opentripmap.com/0.1/en/places/xid/${placeId}?apikey=${otmKey}`;
    const response = await this.httpService.get<OTMPlace>(PROVIDER, url);

    if (!response.data || !response.data.xid) {
      throw new ProviderUnavailableException(
        PROVIDER,
        'OpenTripMap Details returned invalid response',
      );
    }

    const p = response.data;
    return {
      placeId: p.xid,
      name: p.name || 'Unnamed Place',
      address: p.address ? `${p.address.road || ''}, ${p.address.city || ''}` : undefined,
      latitude: p.point.lat,
      longitude: p.point.lon,
      rating: p.rate,
      types: p.kinds ? p.kinds.split(',') : [],
      openNow: undefined,
      priceLevel: undefined,
    };
  }
}
