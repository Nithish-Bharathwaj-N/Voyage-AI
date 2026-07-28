import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TripsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(data: any, userId: string) {
    return this.prisma.trip.create({
      data: {
        title: data.title,
        destinationId: data.destinationId,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        budget: data.budget,
        travelStyle: data.travelStyle,
        companions: data.companions || 1,
        notes: data.notes || '',
        ownerId: userId,
      },
    });
  }

  async findAll(userId: string) {
    const trips = await this.prisma.trip.findMany({
      where: { ownerId: userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { dayPlans: true }
        }
      }
    });

    return trips.map(t => {
      // Calculate duration
      const diffTime = Math.abs(t.endDate.getTime() - t.startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return {
        ...t,
        planningProgress: t.status === 'COMPLETED' ? 100 : t.status === 'UPCOMING' ? 80 : 30,
        travelerCount: t.companions || 1,
        isFavorite: t.isFavorite || false,
        isTemplate: false,
        isDraft: t.status === 'DRAFT' || t.status === 'PLANNING',
        isArchived: t.isArchived || false,
        isShared: false,
        durationLabel: `${diffDays} days`,
        primaryDestination: t.destinationId,
        destinationsLabel: t.destinationId,
        coverImage: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=800'
      };
    });
  }

  async findOne(id: string, userId: string) {
    const trip = await this.prisma.trip.findFirst({
      where: { id, ownerId: userId, deletedAt: null },
      include: {
        dayPlans: {
          orderBy: { orderIndex: 'asc' },
          include: {
            activities: {
              orderBy: { startTime: 'asc' }
            }
          }
        }
      }
    });
    if (!trip) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(id: string, userId: string, data: any) {
    return this.prisma.trip.update({
      where: { id, ownerId: userId },
      data,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.trip.update({
      where: { id, ownerId: userId },
      data: { deletedAt: new Date(), status: 'CANCELLED' },
    });
  }

  async duplicate(id: string, userId: string) {
    const existing = await this.findOne(id, userId);
    return this.prisma.trip.create({
      data: {
        title: existing.title + ' (Copy)',
        destinationId: existing.destinationId,
        startDate: existing.startDate,
        endDate: existing.endDate,
        budget: existing.budget,
        travelStyle: existing.travelStyle,
        companions: existing.companions,
        notes: existing.notes,
        ownerId: userId,
      }
    });
  }

  async archive(id: string, userId: string) {
    return this.prisma.trip.update({
      where: { id, ownerId: userId },
      data: { isArchived: true },
    });
  }
}
