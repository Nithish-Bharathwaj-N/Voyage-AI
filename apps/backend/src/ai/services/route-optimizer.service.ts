import { Injectable, Logger } from '@nestjs/common';
import { GeoIntelligenceService, GeoPoint } from './geo-intelligence.service';

@Injectable()
export class RouteOptimizerService {
  private readonly logger = new Logger(RouteOptimizerService.name);

  constructor(private readonly geoIntelligence: GeoIntelligenceService) {}

  /**
   * Post-processes an AI-generated day to ensure the activities are somewhat geographically sorted.
   * If the LLM generates a route that zig-zags wildly, this service flags it or repairs it.
   */
  public validateRouteEfficiency(dayActivities: any[]): boolean {
    if (!dayActivities || dayActivities.length < 2) return true;

    let totalDistance = 0;
    for (let i = 0; i < dayActivities.length - 1; i++) {
      const p1 = dayActivities[i].coordinates as GeoPoint;
      const p2 = dayActivities[i + 1].coordinates as GeoPoint;
      
      if (p1 && p2 && typeof p1.lat === 'number' && typeof p2.lat === 'number') {
        const dist = this.geoIntelligence.calculateDistanceKm(p1, p2);
        totalDistance += dist;
      }
    }

    // A typical day shouldn't involve driving more than 100km purely within a city/region activities
    if (totalDistance > 150) {
      this.logger.warn(`Route Optimizer Flagged Inefficient Route! Total intra-day distance: ${totalDistance}km`);
      return false; // Flag for LLM repair
    }

    this.logger.debug(`Route efficiency validated. Total intra-day distance: ${Math.round(totalDistance)}km`);
    return true;
  }
}
