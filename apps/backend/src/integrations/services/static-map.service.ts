import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStaticMapProvider, GeoCoordinate } from '../interfaces/maps.interface';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'StaticMapService';
const MAPBOX_STATIC_BASE = 'https://api.mapbox.com/styles/v1/mapbox/streets-v12/static';

@Injectable()
export class StaticMapService implements IStaticMapProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly mapboxKey: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.mapboxKey = this.configService.get<string>('integrations.mapboxApiKey');
  }

  generateStaticMap(center: GeoCoordinate, zoom: number, width: number, height: number): string {
    if (!this.mapboxKey) {
      throw new ProviderUnavailableException(PROVIDER, 'Mapbox API key not configured');
    }
    return `${MAPBOX_STATIC_BASE}/${center.longitude},${center.latitude},${zoom},0,0/${width}x${height}?access_token=${this.mapboxKey}`;
  }

  generateStaticMapWithRoute(routePolyline: string, width: number, height: number): string {
    if (!this.mapboxKey) {
      throw new ProviderUnavailableException(PROVIDER, 'Mapbox API key not configured');
    }
    // Encode polyline appropriately for URL
    const encodedPolyline = encodeURIComponent(routePolyline);
    return `${MAPBOX_STATIC_BASE}/path-5+f44-0.5(${encodedPolyline})/auto/${width}x${height}?padding=50&access_token=${this.mapboxKey}`;
  }

  generateStaticMapWithMarkers(markers: GeoCoordinate[], width: number, height: number): string {
    if (!this.mapboxKey) {
      throw new ProviderUnavailableException(PROVIDER, 'Mapbox API key not configured');
    }

    if (markers.length === 0) {
      throw new Error('At least one marker is required');
    }

    // Mapbox limit for markers in URL is relatively high, but URLs have max length.
    const limitedMarkers = markers.slice(0, 50);
    const markerStrings = limitedMarkers
      .map((m) => `pin-s+f44(${m.longitude},${m.latitude})`)
      .join(',');

    return `${MAPBOX_STATIC_BASE}/${markerStrings}/auto/${width}x${height}?padding=50&access_token=${this.mapboxKey}`;
  }
}
