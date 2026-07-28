import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getDashboardData(userId: string) {
    const upcomingTrips = await this.prisma.trip.findMany({
      where: { ownerId: userId, status: 'UPCOMING', deletedAt: null },
      orderBy: { startDate: 'asc' },
      take: 3,
    }).then(trips => trips.map(t => ({
      ...t,
      date: `${t.startDate.toLocaleDateString()} - ${t.endDate.toLocaleDateString()}`,
      durationLabel: `${Math.ceil(Math.abs(t.endDate.getTime() - t.startDate.getTime()) / (1000 * 60 * 60 * 24))} days`,
      coverImage: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=800'
    })));

    const recentTrips = await this.prisma.trip.findMany({
      where: { ownerId: userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }).then(trips => trips.map(t => ({
      ...t,
      date: `${t.startDate.toLocaleDateString()} - ${t.endDate.toLocaleDateString()}`,
      durationLabel: `${Math.ceil(Math.abs(t.endDate.getTime() - t.startDate.getTime()) / (1000 * 60 * 60 * 24))} days`,
      coverImage: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=800'
    })));

    let statistics = await this.prisma.tripStatistics.findUnique({
      where: { userId }
    });
    if (!statistics) {
      try {
        // Ensure user exists first before creating stats to prevent FK violation
        await this.prisma.user.upsert({
          where: { id: userId },
          update: {},
          create: { id: userId, email: 'unknown@example.com' }
        });
        statistics = await this.prisma.tripStatistics.create({ data: { userId } });
      } catch (e) {
        console.error('Failed to create trip statistics:', e);
        // Fallback to empty statistics if DB fails
        statistics = {
          id: 'temp', userId, countriesCount: 0, citiesCount: 0,
          totalTrips: 0, budgetSaved: 0, daysTraveled: 0,
          savedPlacesCount: 0, collectionsCount: 0, updatedAt: new Date()
        } as any;
      }
    }

    const savedDestinations = await this.prisma.savedDestination.findMany({
      where: { userId },
      include: { destination: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const collections = await this.prisma.collection.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 4,
    });

    const recentActivity = await this.prisma.recentActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return {
      upcomingTrips,
      recentTrips,
      statistics,
      savedDestinations,
      collections,
      recentActivity
    };
  }
}
