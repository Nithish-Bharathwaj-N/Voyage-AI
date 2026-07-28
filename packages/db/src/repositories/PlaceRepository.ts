import { PrismaClient, Place as PrismaPlace } from '@prisma/client';

export interface Place {
  id: string;
  destinationId: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  addressJson: any;
  description: string;
  images: any;
  ratingScore: number | null;
  ratingCount: number;
  activityCategories: string[];
  cuisines: string[];
  budgetCategory: string | null;
  accommodationType: string | null;
}

export interface PlaceRepository {
  findById(id: string): Promise<Place | null>;
  findNearbyPlaces(lat: number, lng: number, radiusKm: number, type?: string): Promise<Place[]>;
  create(entity: Place): Promise<Place>;
}

export class PrismaPlaceRepository implements PlaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Place | null> {
    const place = await this.prisma.place.findUnique({
      where: { id, deletedAt: null },
    });
    if (!place) return null;
    return this.mapToDomain(place);
  }

  async findNearbyPlaces(lat: number, lng: number, radiusKm: number, type?: string): Promise<Place[]> {
    // PostGIS Note: To enforce the DB separation, this raw SQL is isolated here.
    // We use ST_DistanceSphere (Haversine approximation) if full PostGIS isn't fully set up,
    // or ST_DWithin for exact PostGIS. The user mandated raw SQL spatial queries.
    
    // Convert radius from Km to meters
    const radiusMeters = radiusKm * 1000;
    
    let rawQuery = `
      SELECT * FROM "Place"
      WHERE "deletedAt" IS NULL
      AND ST_DWithin(
        ST_MakePoint(longitude, latitude)::geography,
        ST_MakePoint($1, $2)::geography,
        $3
      )
    `;

    const args: any[] = [lng, lat, radiusMeters];

    if (type) {
      rawQuery += ` AND type = $4`;
      args.push(type);
    }

    const places = await this.prisma.$queryRawUnsafe<PrismaPlace[]>(rawQuery, ...args);
    return places.map(this.mapToDomain);
  }

  async create(entity: Place): Promise<Place> {
    const place = await this.prisma.place.create({
      data: {
        id: entity.id,
        destinationId: entity.destinationId,
        name: entity.name,
        type: entity.type,
        latitude: entity.latitude,
        longitude: entity.longitude,
        addressJson: entity.addressJson || {},
        description: entity.description,
        images: entity.images || [],
        ratingScore: entity.ratingScore,
        ratingCount: entity.ratingCount,
        activityCategories: entity.activityCategories,
        cuisines: entity.cuisines,
        budgetCategory: entity.budgetCategory,
        accommodationType: entity.accommodationType,
      }
    });
    return this.mapToDomain(place);
  }

  private mapToDomain(prismaPlace: PrismaPlace): Place {
    return {
      id: prismaPlace.id,
      destinationId: prismaPlace.destinationId,
      name: prismaPlace.name,
      type: prismaPlace.type,
      latitude: prismaPlace.latitude,
      longitude: prismaPlace.longitude,
      addressJson: prismaPlace.addressJson,
      description: prismaPlace.description,
      images: prismaPlace.images,
      ratingScore: prismaPlace.ratingScore,
      ratingCount: prismaPlace.ratingCount,
      activityCategories: prismaPlace.activityCategories,
      cuisines: prismaPlace.cuisines,
      budgetCategory: prismaPlace.budgetCategory,
      accommodationType: prismaPlace.accommodationType,
    };
  }
}
