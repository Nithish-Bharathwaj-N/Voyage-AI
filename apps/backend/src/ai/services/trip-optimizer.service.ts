import { Injectable, Logger } from '@nestjs/common';
import { ActivityItem } from '../interfaces/itinerary.interface';

@Injectable()
export class TripOptimizerService {
  private readonly logger = new Logger(TripOptimizerService.name);

  /**
   * Resequence activities using nearest neighbor heuristic based on coordinates
   * to minimize overall travel distance and transit times.
   */
  optimizeResequencing(activities: ActivityItem[]): ActivityItem[] {
    if (activities.length <= 2) return activities;

    const unvisited = [...activities];
    const optimized: ActivityItem[] = [];

    // Filter items with valid coordinates
    const withCoords = unvisited.filter(
      (a) => a.coordinates && a.coordinates.latitude && a.coordinates.longitude,
    );
    const withoutCoords = unvisited.filter(
      (a) => !a.coordinates || !a.coordinates.latitude || !a.coordinates.longitude,
    );

    if (withCoords.length === 0) return activities;

    // Start with the first scheduled activity
    let current = withCoords.shift()!;
    optimized.push(current);

    while (withCoords.length > 0) {
      let nearestIdx = 0;
      let minDistance = Infinity;

      for (let i = 0; i < withCoords.length; i++) {
        const dist = this.haversineDistance(current.coordinates!, withCoords[i].coordinates!);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = i;
        }
      }

      current = withCoords.splice(nearestIdx, 1)[0];
      optimized.push(current);
    }

    // Append activities without coordinate mappings at the end
    return [...optimized, ...withoutCoords];
  }

  /**
   * Calculate haversine distance in kilometers between two coordinate pairs.
   */
  private haversineDistance(
    coord1: { latitude: number; longitude: number },
    coord2: { latitude: number; longitude: number },
  ): number {
    const toRad = (x: number): number => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLng = toRad(coord2.longitude - coord1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1.latitude)) *
        Math.cos(toRad(coord2.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
