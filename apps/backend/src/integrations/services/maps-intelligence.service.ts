import { Injectable, Logger } from '@nestjs/common';
import { IMapsIntelligenceProvider, GeoCoordinate } from '../interfaces/maps.interface';
import { RouteDto, TransportMode } from '../dto/maps.dto';
import { IPlaceProvider, PLACE_PROVIDER } from '../interfaces/place.interface';
import { Inject } from '@nestjs/common';

const PROVIDER = 'MapsIntelligenceService';

@Injectable()
export class MapsIntelligenceService implements IMapsIntelligenceProvider {
  private readonly logger = new Logger(PROVIDER);

  constructor(@Inject(PLACE_PROVIDER) private readonly placeProvider: IPlaceProvider) {}

  recommendTransportMode(distanceMeters: number): TransportMode {
    if (distanceMeters < 2000) return TransportMode.WALKING;
    if (distanceMeters < 10000) return TransportMode.CYCLING; // Or Transit
    return TransportMode.DRIVING;
  }

  estimateTravelEfficiency(route: RouteDto): string {
    const avgSpeedKmh = route.totalDistanceMeters / 1000 / (route.totalDurationSeconds / 3600);
    if (route.mode === TransportMode.DRIVING) {
      if (avgSpeedKmh < 20) return 'LOW'; // Heavy traffic / Urban crawling
      if (avgSpeedKmh > 60) return 'HIGH'; // Highway
      return 'MEDIUM';
    }
    return 'N/A';
  }

  calculateWalkingLoad(route: RouteDto): string {
    if (route.mode !== TransportMode.WALKING) return 'N/A';
    if (route.totalDistanceMeters > 5000) return 'HIGH'; // > 5km is a heavy walk
    if (route.totalDistanceMeters > 2000) return 'MEDIUM';
    return 'LOW';
  }

  detectRouteConflicts(routes: RouteDto[]): string[] {
    const conflicts: string[] = [];
    // A simplified conflict detector: if total driving in a day exceeds 4 hours, flag it
    const totalDuration = routes.reduce((sum, r) => sum + r.totalDurationSeconds, 0);
    if (totalDuration > 14400) {
      conflicts.push('HIGH_TRAVEL_TIME');
    }
    return conflicts;
  }

  async findNearbyAlternatives(location: GeoCoordinate): Promise<GeoCoordinate[]> {
    try {
      const places = await this.placeProvider.searchNearby({
        latitude: location.latitude,
        longitude: location.longitude,
        radiusMeters: 1000,
      });
      return places.slice(0, 5).map((p) => ({
        latitude: p.latitude,
        longitude: p.longitude,
      }));
    } catch (e) {
      this.logger.warn('Could not find nearby alternatives');
      return [];
    }
  }

  estimateCarbonEmission(route: RouteDto): number {
    // Basic approximation: grams of CO2 per km
    const distanceKm = route.totalDistanceMeters / 1000;
    switch (route.mode) {
      case TransportMode.DRIVING:
        return distanceKm * 192; // avg car ~192g/km
      case TransportMode.TRANSIT:
        return distanceKm * 68; // avg bus ~68g/km
      case TransportMode.CYCLING:
      case TransportMode.WALKING:
        return 0;
      default:
        return 0;
    }
  }
}
