import { PrismaClient } from '@prisma/client';
import { DestinationRepository, Destination, DestinationId } from '@voyageai/types';

export class PrismaDestinationRepository implements DestinationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: DestinationId): Promise<Destination | null> {
    const dest = await this.prisma.destination.findUnique({ where: { id } });
    if (!dest) return null;
    return this.mapToDomain(dest);
  }

  async findAll(): Promise<Destination[]> {
    const dests = await this.prisma.destination.findMany();
    return dests.map(this.mapToDomain);
  }

  async searchByName(query: string): Promise<Destination[]> {
    const dests = await this.prisma.destination.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
    });
    return dests.map(this.mapToDomain);
  }

  async findByCountry(country: string): Promise<Destination[]> {
    const dests = await this.prisma.destination.findMany({
      where: { country },
    });
    return dests.map(this.mapToDomain);
  }

  async create(entity: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>): Promise<Destination> {
    const dest = await this.prisma.destination.create({
      data: {
        name: entity.name,
        country: entity.country,
        latitude: entity.coordinates.latitude,
        longitude: entity.coordinates.longitude,
        description: entity.description as string,
        heroImageUrl: entity.heroImage.url as string,
        activeSeasons: entity.activeSeasons,
      },
    });
    return this.mapToDomain(dest);
  }

  async update(id: DestinationId, entity: Partial<Destination>): Promise<Destination> {
    const dest = await this.prisma.destination.update({
      where: { id },
      data: { name: entity.name, description: entity.description as string },
    });
    return this.mapToDomain(dest);
  }

  async delete(id: DestinationId): Promise<boolean> {
    await this.prisma.destination.delete({ where: { id } });
    return true;
  }

  private mapToDomain(prismaDest: any): Destination {
    return {
      id: prismaDest.id as DestinationId,
      name: prismaDest.name,
      country: prismaDest.country,
      coordinates: {
        latitude: prismaDest.latitude as any,
        longitude: prismaDest.longitude as any,
      },
      description: prismaDest.description as any,
      heroImage: {
        url: prismaDest.heroImageUrl as any,
        altText: prismaDest.name,
      },
      activeSeasons: prismaDest.activeSeasons,
    };
  }
}
