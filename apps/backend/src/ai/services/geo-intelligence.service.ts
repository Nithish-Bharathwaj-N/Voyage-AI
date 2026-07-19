import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface GeoDestination {
  slug: string;
  name: string;
  category: string;
  hiddenGem: boolean;
  coordinates: GeoPoint;
}

export interface GeoRelationship {
  destination: GeoDestination;
  distanceKm: number;
  estimatedTravelTimeMinutes: number;
}

@Injectable()
export class GeoIntelligenceService {
  private readonly logger = new Logger(GeoIntelligenceService.name);
  private destinationGraph: GeoDestination[] = [];

  constructor() {
    this.loadGraph();
  }

  private loadGraph() {
    const dataPath = path.resolve(__dirname, '../../../../../../voyageai-frontend/public/data/destinations/India/TamilNadu');
    try {
      if (fs.existsSync(dataPath)) {
        const files = fs.readdirSync(dataPath).filter(f => f.endsWith('.json'));
        for (const file of files) {
          const data = JSON.parse(fs.readFileSync(path.join(dataPath, file), 'utf-8'));
          if (data.coordinates && typeof data.coordinates.lat === 'number') {
            this.destinationGraph.push({
              slug: data.slug || file.replace('.json', ''),
              name: data.name,
              category: data.category || 'Hidden Gem',
              hiddenGem: !!data.hiddenGem,
              coordinates: { lat: data.coordinates.lat, lng: data.coordinates.lng }
            });
          }
        }
        this.logger.log(`Loaded Geo-Graph with ${this.destinationGraph.length} destinations in Tamil Nadu.`);
      }
    } catch (err) {
      this.logger.warn(`Failed to load destination graph: ${err}`);
    }
  }

  /**
   * Calculate Haversine distance between two points in km.
   */
  public calculateDistanceKm(p1: GeoPoint, p2: GeoPoint): number {
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(p2.lat - p1.lat);
    const dLon = this.deg2rad(p2.lng - p1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(p1.lat)) * Math.cos(this.deg2rad(p2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Find nearby destinations from a given point, sorted by distance.
   */
  public findNearbyDestinations(
    origin: GeoPoint,
    maxDistanceKm: number = 200,
    limit: number = 5,
    excludeSlug?: string
  ): GeoRelationship[] {
    const relationships: GeoRelationship[] = [];
    for (const dest of this.destinationGraph) {
      if (excludeSlug && dest.slug === excludeSlug) continue;
      const distance = this.calculateDistanceKm(origin, dest.coordinates);
      if (distance <= maxDistanceKm) {
        // Average driving speed in Indian hilly/regional areas ~40km/h
        const travelTimeMinutes = Math.round((distance / 40) * 60);
        relationships.push({
          destination: dest,
          distanceKm: Math.round(distance * 10) / 10,
          estimatedTravelTimeMinutes: travelTimeMinutes
        });
      }
    }
    return relationships.sort((a, b) => a.distanceKm - b.distanceKm).slice(0, limit);
  }
}
