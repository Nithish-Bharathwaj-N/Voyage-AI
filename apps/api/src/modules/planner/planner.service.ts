import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class PlannerService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async getPlanner(tripId: string, userId: string) {
    const trip = await this.prisma.trip.findFirst({
      where: { id: tripId, ownerId: userId, deletedAt: null },
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
    if (!trip) throw new NotFoundException('Trip not found or unauthorized');
    return trip;
  }

  async addOrUpdateDays(tripId: string, userId: string, days: any[]) {
    // Basic implementation: for each day, upsert
    const trip = await this.prisma.trip.findFirst({ where: { id: tripId, ownerId: userId }});
    if (!trip) throw new NotFoundException();

    return Promise.all(days.map(day => 
      this.prisma.dayPlan.upsert({
        where: { id: day.id || 'new-id' },
        update: { orderIndex: day.orderIndex, date: new Date(day.date), notes: day.notes },
        create: { tripId, orderIndex: day.orderIndex, date: new Date(day.date), notes: day.notes }
      })
    ));
  }

  async addActivity(tripId: string, userId: string, data: any) {
    // Verify trip ownership
    const trip = await this.prisma.trip.findFirst({ where: { id: tripId, ownerId: userId }});
    if (!trip) throw new NotFoundException();

    return this.prisma.activity.create({
      data: {
        dayPlanId: data.dayPlanId,
        title: data.title,
        type: data.type,
        startTime: data.startTime,
        endTime: data.endTime,
        location: data.location,
        notes: data.notes,
        priority: data.priority,
        status: data.status,
        costMin: data.costMin,
        costMax: data.costMax,
        currency: data.currency,
        attachments: data.attachments || {}
      }
    });
  }

  async updateActivity(tripId: string, activityId: string, userId: string, data: any) {
    const trip = await this.prisma.trip.findFirst({ where: { id: tripId, ownerId: userId }});
    if (!trip) throw new NotFoundException();

    return this.prisma.activity.update({
      where: { id: activityId },
      data
    });
  }

  async removeActivity(tripId: string, activityId: string, userId: string) {
    const trip = await this.prisma.trip.findFirst({ where: { id: tripId, ownerId: userId }});
    if (!trip) throw new NotFoundException();

    return this.prisma.activity.delete({
      where: { id: activityId }
    });
  }
}
