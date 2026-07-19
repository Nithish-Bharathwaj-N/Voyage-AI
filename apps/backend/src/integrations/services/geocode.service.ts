import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGeocodeProvider } from '../interfaces/maps.interface';
import { GeocodeDto, ReverseGeocodeDto } from '../dto/maps.dto';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'GeocodeService';
const MAPBOX_GEOCODE_BASE = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const CACHE_TTL = 86400; // 24 hours — geocode results are highly stable

interface MapboxFeature {
  id: string;
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  context?: Array<{
    id: string;
    short_code?: string;
    text: string;
  }>;
}

interface MapboxGeocodeResponse {
  features: MapboxFeature[];
}

interface NominatimResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    country?: string;
    country_code?: string;
    state?: string;
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
  };
}

@Injectable()
export class GeocodeService implements IGeocodeProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly mapboxKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.mapboxKey = this.configService.get<string>('integrations.mapboxApiKey');
  }

  async geocode(address: string): Promise<GeocodeDto[]> {
    const cacheKey = CacheService.buildKey('geocode', 'forward', encodeURIComponent(address));
    const cached = await this.cacheService.get<GeocodeDto[]>(cacheKey);
    if (cached) {
      this.logger.debug(`Cache HIT: ${cacheKey}`);
      return cached;
    }

    let results: GeocodeDto[] = [];
    if (this.mapboxKey) {
      try {
        results = await this.geocodeMapbox(address);
      } catch (error) {
        this.logger.warn('Mapbox Geocode failed, falling back to Nominatim');
        results = await this.geocodeNominatim(address);
      }
    } else {
      results = await this.geocodeNominatim(address);
    }

    if (results.length > 0) {
      await this.cacheService.set(cacheKey, results, CACHE_TTL);
    }
    return results;
  }

  async reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeDto> {
    const cacheKey = CacheService.buildKey('geocode', 'reverse', String(lat), String(lng));
    const cached = await this.cacheService.get<ReverseGeocodeDto>(cacheKey);
    if (cached) return cached;

    let result: ReverseGeocodeDto;
    if (this.mapboxKey) {
      try {
        result = await this.reverseGeocodeMapbox(lat, lng);
      } catch (error) {
        this.logger.warn('Mapbox Reverse Geocode failed, falling back to Nominatim');
        result = await this.reverseGeocodeNominatim(lat, lng);
      }
    } else {
      result = await this.reverseGeocodeNominatim(lat, lng);
    }

    await this.cacheService.set(cacheKey, result, CACHE_TTL);
    return result;
  }

  private async geocodeMapbox(address: string): Promise<GeocodeDto[]> {
    const url = `${MAPBOX_GEOCODE_BASE}/${encodeURIComponent(address)}.json?access_token=${this.mapboxKey}&limit=5`;
    const response = await this.httpService.get<MapboxGeocodeResponse>(PROVIDER, url);
    return response.data.features.map(this.mapMapboxFeature);
  }

  private async reverseGeocodeMapbox(lat: number, lng: number): Promise<ReverseGeocodeDto> {
    const url = `${MAPBOX_GEOCODE_BASE}/${lng},${lat}.json?access_token=${this.mapboxKey}&limit=1`;
    const response = await this.httpService.get<MapboxGeocodeResponse>(PROVIDER, url);
    if (!response.data.features || response.data.features.length === 0) {
      throw new ProviderUnavailableException(PROVIDER, 'No reverse geocode result from Mapbox');
    }
    return this.mapMapboxFeature(response.data.features[0]);
  }

  private async geocodeNominatim(address: string): Promise<GeocodeDto[]> {
    const url = `${NOMINATIM_BASE}/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1&limit=5`;
    const response = await this.httpService.get<NominatimResult[]>(PROVIDER, url, {
      headers: { 'User-Agent': 'VoyageAI/1.0' },
    });
    return response.data.map(this.mapNominatimResult);
  }

  private async reverseGeocodeNominatim(lat: number, lng: number): Promise<ReverseGeocodeDto> {
    const url = `${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`;
    const response = await this.httpService.get<NominatimResult>(PROVIDER, url, {
      headers: { 'User-Agent': 'VoyageAI/1.0' },
    });
    if (!response.data || !response.data.lat) {
      throw new ProviderUnavailableException(PROVIDER, 'No reverse geocode result returned');
    }
    return this.mapNominatimResult(response.data);
  }

  private mapMapboxFeature(item: MapboxFeature): GeocodeDto {
    let country: string | undefined;
    let countryCode: string | undefined;
    let city: string | undefined;

    if (item.context) {
      for (const ctx of item.context) {
        if (ctx.id.startsWith('country.')) {
          country = ctx.text;
          countryCode = ctx.short_code?.toUpperCase();
        }
        if (ctx.id.startsWith('place.')) {
          city = ctx.text;
        }
      }
    }

    return {
      formattedAddress: item.place_name,
      latitude: item.center[1],
      longitude: item.center[0],
      city,
      country,
      countryCode,
      placeId: item.id,
    };
  }

  private mapNominatimResult(item: NominatimResult): GeocodeDto {
    return {
      formattedAddress: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      country: item.address?.country,
      countryCode: item.address?.country_code?.toUpperCase(),
      city: item.address?.city ?? item.address?.town ?? item.address?.village,
      placeId: String(item.place_id),
    };
  }
}
