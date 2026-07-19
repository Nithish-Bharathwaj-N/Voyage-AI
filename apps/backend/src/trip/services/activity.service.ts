import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TripActivity, CollaboratorRole } from '@prisma/client';
import { TripService } from './trip.service';
import { CreateActivityDto, UpdateActivityDto, ActivityResponseData } from '../dto/activity.dto';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tripService: TripService,
  ) {}

  /**
   * Retrieve activity or throw
   */
  private async getActivityOrThrow(id: string): Promise<TripActivity> {
    const act = await this.prisma.tripActivity.findUnique({
      where: { id },
    });
    if (!act) {
      throw new NotFoundException('Activity not found');
    }
    return act;
  }

  /**
   * Retrieve destination associated tripId or throw
   */
  private async getDestinationTripId(destinationId: string): Promise<string> {
    const dest = await this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
    if (!dest) {
      throw new NotFoundException('Destination not found');
    }
    return dest.tripId;
  }

  /**
   * Add activity to destination
   */
  async addActivity(
    userId: string,
    destinationId: string,
    dto: CreateActivityDto,
  ): Promise<ActivityResponseData> {
    const tripId = await this.getDestinationTripId(destinationId);

    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    const activity = await this.prisma.tripActivity.create({
      data: {
        tripId,
        destinationId,
        name: dto.name,
        description: dto.description,
        locationName: dto.locationName,
        latitude: dto.latitude,
        longitude: dto.longitude,
        startTime: dto.startTime,
        endTime: dto.endTime,
        cost: dto.cost,
        notes: dto.notes,
        order: dto.order,
      },
    });

    this.logger.log(
      `Activity Added: ${activity.id} to destination ${destinationId} by user ${userId}`,
    );
    return activity;
  }

  /**
   * Update activity details
   */
  async updateActivity(
    userId: string,
    id: string,
    dto: UpdateActivityDto,
  ): Promise<ActivityResponseData> {
    const act = await this.getActivityOrThrow(id);

    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(act.tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    const updated = await this.prisma.tripActivity.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        locationName: dto.locationName,
        latitude: dto.latitude,
        longitude: dto.longitude,
        startTime: dto.startTime,
        endTime: dto.endTime,
        cost: dto.cost,
        notes: dto.notes,
        order: dto.order,
      },
    });

    this.logger.log(`Activity Updated: ${id} by user ${userId}`);
    return updated;
  }

  /**
   * Delete activity
   */
  async deleteActivity(userId: string, id: string): Promise<Record<string, never>> {
    const act = await this.getActivityOrThrow(id);

    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(act.tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    await this.prisma.tripActivity.delete({
      where: { id },
    });

    this.logger.log(`Activity Deleted: ${id} by user ${userId}`);
    return {};
  }

  /**
   * List all activities in a destination
   */
  async getActivities(userId: string, destinationId: string): Promise<ActivityResponseData[]> {
    const tripId = await this.getDestinationTripId(destinationId);

    // Verify read permissions (OWNER, EDITOR, VIEWER or PUBLIC read)
    await this.tripService.verifyAccess(
      tripId,
      userId,
      [CollaboratorRole.OWNER, CollaboratorRole.EDITOR, CollaboratorRole.VIEWER],
      true,
    );

    const activities = await this.prisma.tripActivity.findMany({
      where: { destinationId },
      orderBy: { order: 'asc' },
    });
    return activities;
  }
}
