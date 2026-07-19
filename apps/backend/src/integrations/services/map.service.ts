import { Injectable, Logger } from '@nestjs/common';
import { IMapProvider, GeoCoordinate } from '../interfaces/maps.interface';
import { MapBoundsDto } from '../dto/maps.dto';

const PROVIDER = 'MapService';

@Injectable()
export class MapService implements IMapProvider {
  private readonly logger = new Logger(PROVIDER);

  fitMapBounds(coordinates: GeoCoordinate[]): MapBoundsDto {
    if (coordinates.length === 0) {
      return { north: 0, south: 0, east: 0, west: 0 };
    }

    let north = coordinates[0].latitude;
    let south = coordinates[0].latitude;
    let east = coordinates[0].longitude;
    let west = coordinates[0].longitude;

    for (const coord of coordinates) {
      if (coord.latitude > north) north = coord.latitude;
      if (coord.latitude < south) south = coord.latitude;
      if (coord.longitude > east) east = coord.longitude;
      if (coord.longitude < west) west = coord.longitude;
    }

    return { north, south, east, west };
  }

  clusterMarkers(coordinates: GeoCoordinate[], radius: number): GeoCoordinate[][] {
    // Simple naive clustering for small datasets
    const clusters: GeoCoordinate[][] = [];
    const visited = new Set<number>();

    for (let i = 0; i < coordinates.length; i++) {
      if (visited.has(i)) continue;

      const cluster: GeoCoordinate[] = [coordinates[i]];
      visited.add(i);

      for (let j = i + 1; j < coordinates.length; j++) {
        if (visited.has(j)) continue;

        const distance = this.calculateDistance(coordinates[i], coordinates[j]);
        if (distance <= radius) {
          cluster.push(coordinates[j]);
          visited.add(j);
        }
      }
      clusters.push(cluster);
    }

    return clusters;
  }

  // Haversine formula
  private calculateDistance(coord1: GeoCoordinate, coord2: GeoCoordinate): number {
    const R = 6371e3; // metres
    const φ1 = (coord1.latitude * Math.PI) / 180;
    const φ2 = (coord2.latitude * Math.PI) / 180;
    const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
    const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
