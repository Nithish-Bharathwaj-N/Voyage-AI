import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async logActivity(userId: string, action: string, metadata?: any) {
    return this.prisma.recentActivity.create({
      data: {
        userId,
        action,
        metadata: metadata || {}
      }
    });
  }

  async getRecentActivities(userId: string, limit: number = 10) {
    return this.prisma.recentActivity.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }
}
