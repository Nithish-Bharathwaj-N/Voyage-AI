/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IRoutingProvider } from '../interfaces/maps.interface';
import { RouteDto, WaypointDto, TransportMode, RouteLegDto } from '../dto/maps.dto';
import { HttpService } from './http.service';
import { CacheService } from './cache.service';
import { ProviderUnavailableException } from '../exceptions/provider-unavailable.exception';

const PROVIDER = 'RoutingService';
const MAPBOX_DIRECTIONS_BASE = 'https://api.mapbox.com/directions/v5/mapbox';
const CACHE_TTL = 3600 * 24; // 24 hours

interface MapboxDirectionsResponse {
  code: string;
  routes: Array<{
    distance: number;
    duration: number;
    geometry: string;
    legs: Array<{
      distance: number;
      duration: number;
      summary: string;
      steps: Array<{
        instruction: string;
        distance: number;
        duration: number;
        maneuver: {
          instruction: string;
          type: string;
        };
        maneuver_location: [number, number]; // custom extraction
      }>;
    }>;
  }>;
}

@Injectable()
export class RoutingService implements IRoutingProvider {
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
        // Mapbox does not have native transit routing. Fallback to driving or a transit service.
        return 'driving';
      default:
        return 'driving';
    }
  }

  async calculateRoute(
    origin: WaypointDto,
    destination: WaypointDto,
    mode: TransportMode,
  ): Promise<RouteDto> {
    return this.calculateMultiStopRoute([origin, destination], mode);
  }

  async calculateMultiStopRoute(waypoints: WaypointDto[], mode: TransportMode): Promise<RouteDto> {
    if (!this.mapboxKey) {
      throw new ProviderUnavailableException(PROVIDER, 'Mapbox API key not configured');
    }

    if (waypoints.length < 2) {
      throw new Error('At least 2 waypoints are required');
    }

    const coords = waypoints.map((wp) => `${wp.longitude},${wp.latitude}`).join(';');
    const profile = this.getProfile(mode);
    const cacheKey = CacheService.buildKey('routing', profile, coords);

    const cached = await this.cacheService.get<RouteDto>(cacheKey);
    if (cached) return cached;

    const url = `${MAPBOX_DIRECTIONS_BASE}/${profile}/${coords}?access_token=${this.mapboxKey}&geometries=polyline&overview=full&steps=true`;

    try {
      const response = await this.httpService.get<MapboxDirectionsResponse>(PROVIDER, url);

      if (response.data.code !== 'Ok' || response.data.routes.length === 0) {
        throw new Error('No route found');
      }

      const routeData = response.data.routes[0];
      const legs: RouteLegDto[] = routeData.legs.map((leg) => ({
        distanceMeters: leg.distance,
        durationSeconds: leg.duration,
        summary: leg.summary,
        steps: leg.steps.map((step: any) => ({
          instruction: step.maneuver.instruction,
          distanceMeters: step.distance,
          durationSeconds: step.duration,
          maneuver: step.maneuver.type,
          location: {
            latitude: step.maneuver.location[1],
            longitude: step.maneuver.location[0],
          },
        })),
      }));

      const route: RouteDto = {
        origin: waypoints[0],
        destination: waypoints[waypoints.length - 1],
        mode,
        totalDistanceMeters: routeData.distance,
        totalDurationSeconds: routeData.duration,
        geometryPolyline: routeData.geometry,
        legs,
        waypoints,
      };

      await this.cacheService.set(cacheKey, route, CACHE_TTL);
      return route;
    } catch (error: unknown) {
      this.logger.error(
        `Failed to calculate route: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new ProviderUnavailableException(PROVIDER, 'Routing calculation failed');
    }
  }

  async calculateWalkingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto> {
    return this.calculateRoute(origin, destination, TransportMode.WALKING);
  }

  async calculateDrivingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto> {
    return this.calculateRoute(origin, destination, TransportMode.DRIVING);
  }

  async calculateTransitRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto> {
    return this.calculateRoute(origin, destination, TransportMode.TRANSIT);
  }

  async calculateCyclingRoute(origin: WaypointDto, destination: WaypointDto): Promise<RouteDto> {
    return this.calculateRoute(origin, destination, TransportMode.CYCLING);
  }

  async optimizeWaypointOrder(waypoints: WaypointDto[]): Promise<WaypointDto[]> {
    if (!this.mapboxKey || waypoints.length < 3) return waypoints; // Need at least 3 points to optimize

    const coords = waypoints.map((wp) => `${wp.longitude},${wp.latitude}`).join(';');
    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}?source=first&destination=last&roundtrip=false&access_token=${this.mapboxKey}`;

    try {
      const response = await this.httpService.get<any>(PROVIDER, url);
      if (response.data.code !== 'Ok' || !response.data.waypoints) {
        return waypoints;
      }

      const optimized: WaypointDto[] = new Array(waypoints.length);
      for (const wp of response.data.waypoints) {
        optimized[wp.waypoint_index] = waypoints[wp.trips_index];
      }
      // Re-fill in case mapbox waypoints indexing behaves unexpectedly (sometimes first/last are fixed)
      response.data.waypoints.forEach((w: any, index: number) => {
        optimized[index] = waypoints[w.waypoint_index];
      });

      return optimized;
    } catch (error) {
      this.logger.warn('Failed to optimize waypoints, returning original order');
      return waypoints;
    }
  }
}
