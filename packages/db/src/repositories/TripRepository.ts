import { PrismaClient } from '@prisma/client';
import { TripRepository, Trip, TripId, UserId, TripStatus, BudgetCategory, TravelStyle } from '@voyageai/types';

/**
 * Prisma implementation of the TripRepository contract.
 * Note: It explicitly maps Prisma models to Domain Entities before returning.
 */
export class PrismaTripRepository implements TripRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: TripId): Promise<Trip | null> {
    const prismaTrip = await this.prisma.trip.findUnique({
      where: { id, deletedAt: null },
    });
    if (!prismaTrip) return null;
    return this.mapToDomain(prismaTrip);
  }

  async findAll(): Promise<Trip[]> {
    throw new Error('findAll not supported for Trips without pagination constraints.');
  }

  async findByOwner(ownerId: UserId): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where: { ownerId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return trips.map(this.mapToDomain);
  }

  async findActiveTrips(currentDate: Date): Promise<Trip[]> {
    const trips = await this.prisma.trip.findMany({
      where: {
        status: TripStatus.UPCOMING,
        endDate: { gte: currentDate },
        deletedAt: null,
      },
    });
    return trips.map(this.mapToDomain);
  }

  async create(entity: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
    const trip = await this.prisma.trip.create({
      data: {
        ownerId: entity.ownerId,
        destinationId: entity.destinationId,
        title: entity.title,
        startDate: new Date(entity.dates.startDate),
        endDate: new Date(entity.dates.endDate),
        status: entity.status,
        budget: entity.budget,
        travelStyle: entity.travelStyle,
      },
    });
    return this.mapToDomain(trip);
  }

  async update(id: TripId, entity: Partial<Trip>): Promise<Trip> {
    const trip = await this.prisma.trip.update({
      where: { id },
      data: {
        title: entity.title,
        status: entity.status,
        // In a real implementation, add optimistic concurrency version bumps here
      },
    });
    return this.mapToDomain(trip);
  }

  async delete(id: TripId): Promise<boolean> {
    // Soft Delete Implementation
    await this.prisma.trip.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return true;
  }

  private mapToDomain(prismaTrip: any): Trip {
    return {
      id: prismaTrip.id as TripId,
      ownerId: prismaTrip.ownerId as UserId,
      destinationId: prismaTrip.destinationId as any,
      title: prismaTrip.title,
      dates: {
        startDate: prismaTrip.startDate.toISOString().split('T')[0] as any,
        endDate: prismaTrip.endDate.toISOString().split('T')[0] as any,
      },
      status: prismaTrip.status as TripStatus,
      budget: prismaTrip.budget as BudgetCategory,
      travelStyle: prismaTrip.travelStyle as TravelStyle,
      createdAt: prismaTrip.createdAt,
      updatedAt: prismaTrip.updatedAt,
    };
  }
}
