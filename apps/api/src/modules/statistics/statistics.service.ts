import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getStatistics(userId: string) {
    let stats = await this.prisma.tripStatistics.findUnique({
      where: { userId }
    });
    
    if (!stats) {
      try {
        await this.prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: { id: userId, email: 'unknown@example.com' }
        });
        stats = await this.prisma.tripStatistics.create({
          data: { userId }
        });
      } catch (e) {
        console.error('Failed to create trip statistics:', e);
        stats = {
          id: 'temp', userId, countriesCount: 0, citiesCount: 0,
          totalTrips: 0, budgetSaved: 0, daysTraveled: 0,
          savedPlacesCount: 0, collectionsCount: 0, updatedAt: new Date()
        } as any;
      }
    }

    return stats;
  }

  async recalculateStatistics(userId: string) {
    // Basic recalculation logic
    const trips = await this.prisma.trip.findMany({ where: { ownerId: userId, deletedAt: null } });
    const saved = await this.prisma.savedDestination.count({ where: { userId } });
    const colls = await this.prisma.collection.count({ where: { userId } });

    // Sum days traveled from completed trips
    const completedTrips = trips.filter(t => t.status === 'COMPLETED');
    const daysTraveled = completedTrips.reduce((acc, t) => {
      const diffTime = Math.abs(t.endDate.getTime() - t.startDate.getTime());
      return acc + Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }, 0);

    return this.prisma.tripStatistics.update({
      where: { userId },
      data: {
        totalTrips: trips.length,
        savedPlacesCount: saved,
        collectionsCount: colls,
        daysTraveled
      }
    });
  }
}
