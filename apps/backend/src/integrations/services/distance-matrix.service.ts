import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDistanceMatrixProvider } from '../interfaces/maps.interface';
import { DistanceMatrixDto, WaypointDto, TransportMode, TravelTimeDto } from '../dto/maps.dto';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'DistanceMatrixService';
const MAPBOX_MATRIX_BASE = 'https://api.mapbox.com/directions-matrix/v1/mapbox';
const CACHE_TTL = 3600 * 24; // 24 hours

interface MapboxMatrixResponse {
  code: string;
  distances: number[][];
  durations: number[][];
}

@Injectable()
export class DistanceMatrixService implements IDistanceMatrixProvider {
  private readonly logger = new Logger(PROVIDER);
  private readonly mapboxKey: string | undefined;

  constructor(
    private readonly httpService: HttpService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {
    this.mapboxKey = this.configService.get<string>('integrations.mapboxApiKey');
  }

  private getProfile(mode: TransportMode): string {
    switch (mode) {
      case TransportMode.WALKING:
        return 'walking';
      case TransportMode.CYCLING:
        return 'cycling';
      case TransportMode.DRIVING:
        return 'driving';
      case TransportMode.TRANSIT:
        return 'driving';
      default:
        return 'driving';
    }
  }

  async calculateDistanceMatrix(
    origins: WaypointDto[],
    destinations: WaypointDto[],
    mode: TransportMode,
  ): Promise<DistanceMatrixDto> {
    if (!this.mapboxKey) {
      throw new ProviderUnavailableException(PROVIDER, 'Mapbox API key not configured');
    }

    if (origins.length === 0 || destinations.length === 0) {
      throw new Error('Origins and destinations cannot be empty');
    }

    // Mapbox Matrix API accepts up to 25 coordinates total (origins + destinations) for free plan
    const allWaypoints = [...origins, ...destinations];
    if (allWaypoints.length > 25) {
      this.logger.warn(
        'Distance Matrix requested for more than 25 waypoints. May fail depending on Mapbox plan.',
      );
    }

    const coords = allWaypoints.map((wp) => `${wp.longitude},${wp.latitude}`).join(';');
    const sources = origins.map((_, i) => i).join(';');
    const targets = destinations.map((_, i) => i + origins.length).join(';');
    const profile = this.getProfile(mode);

    const cacheKey = CacheService.buildKey('matrix', profile, coords, sources, targets);
    const cached = await this.cacheService.get<DistanceMatrixDto>(cacheKey);
    if (cached) return cached;

    const url = `${MAPBOX_MATRIX_BASE}/${profile}/${coords}?sources=${sources}&destinations=${targets}&annotations=distance,duration&access_token=${this.mapboxKey}`;

    try {
      const response = await this.httpService.get<MapboxMatrixResponse>(PROVIDER, url);

      if (response.data.code !== 'Ok') {
        throw new Error('Matrix calculation failed');
      }

      const rows = response.data.distances.map((distanceRow, i) => {
        return distanceRow.map((distance, j) => {
          const duration = response.data.durations[i][j];
          return {
            distanceMeters: distance,
            durationSeconds: duration,
            status: distance === null || duration === null ? 'FAIL' : 'OK',
          };
        });
      });

      const matrix: DistanceMatrixDto = {
        origins,
        destinations,
        rows,
      };

      await this.cacheService.set(cacheKey, matrix, CACHE_TTL);
      return matrix;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to calculate distance matrix: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new ProviderUnavailableException(PROVIDER, 'Distance Matrix calculation failed');
    }
  }

  async estimateArrivalTimes(
    origin: WaypointDto,
    destinations: WaypointDto[],
    mode: TransportMode,
    departureTime: Date,
  ): Promise<Date[]> {
    const matrix = await this.calculateDistanceMatrix([origin], destinations, mode);
    return matrix.rows[0].map((element) => {
      const arrival = new Date(departureTime.getTime());
      if (element.status === 'OK') {
        arrival.setSeconds(arrival.getSeconds() + element.durationSeconds);
      }
      return arrival;
    });
  }

  async calculateTravelTime(
    origin: WaypointDto,
    destination: WaypointDto,
    mode: TransportMode,
  ): Promise<TravelTimeDto> {
    const matrix = await this.calculateDistanceMatrix([origin], [destination], mode);
    const element = matrix.rows[0][0];

    if (element.status !== 'OK') {
      throw new Error('Could not calculate travel time');
    }

    return {
      durationSeconds: element.durationSeconds,
      mode,
    };
  }
}
