import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Destination, CollaboratorRole } from '@prisma/client';
import { TripService } from './trip.service';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
  DestinationResponseData,
} from '../dto/destination.dto';

@Injectable()
export class DestinationService {
  private readonly logger = new Logger(DestinationService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly tripService: TripService,
  ) {}

  /**
   * Retrieve destination or throw
   */
  private async getDestinationOrThrow(id: string): Promise<Destination> {
    const dest = await this.prisma.destination.findUnique({
      where: { id },
    });
    if (!dest) {
      throw new NotFoundException('Destination not found');
    }
    return dest;
  }

  /**
   * Add a destination to a trip
   */
  async addDestination(
    userId: string,
    tripId: string,
    dto: CreateDestinationDto,
  ): Promise<DestinationResponseData> {
    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    const destination = await this.prisma.destination.create({
      data: {
        tripId,
        name: dto.name,
        latitude: dto.latitude,
        longitude: dto.longitude,
        country: dto.country,
        city: dto.city,
        arrivalDate: dto.arrivalDate,
        departureDate: dto.departureDate,
        notes: dto.notes,
        order: dto.order,
      },
    });

    this.logger.log(`Destination Added: ${destination.id} to trip ${tripId} by user ${userId}`);
    return destination;
  }

  /**
   * Update a destination details
   */
  async updateDestination(
    userId: string,
    id: string,
    dto: UpdateDestinationDto,
  ): Promise<DestinationResponseData> {
    const dest = await this.getDestinationOrThrow(id);

    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(dest.tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    const updated = await this.prisma.destination.update({
      where: { id },
      data: {
        name: dto.name,
        latitude: dto.latitude,
        longitude: dto.longitude,
        country: dto.country,
        city: dto.city,
        arrivalDate: dto.arrivalDate,
        departureDate: dto.departureDate,
        notes: dto.notes,
        order: dto.order,
      },
    });

    this.logger.log(`Destination Updated: ${id} by user ${userId}`);
    return updated;
  }

  /**
   * Delete destination
   */
  async deleteDestination(userId: string, id: string): Promise<Record<string, never>> {
    const dest = await this.getDestinationOrThrow(id);

    // Verify write permissions (OWNER or EDITOR)
    await this.tripService.verifyAccess(dest.tripId, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    await this.prisma.destination.delete({
      where: { id },
    });

    this.logger.log(`Destination Removed: ${id} by user ${userId}`);
    return {};
  }

  /**
   * List all destinations in a trip
   */
  async getDestinations(userId: string, tripId: string): Promise<DestinationResponseData[]> {
    // Verify read permissions (OWNER, EDITOR, VIEWER or PUBLIC read)
    await this.tripService.verifyAccess(
      tripId,
      userId,
      [CollaboratorRole.OWNER, CollaboratorRole.EDITOR, CollaboratorRole.VIEWER],
      true,
    );

    const destinations = await this.prisma.destination.findMany({
      where: { tripId },
      orderBy: { order: 'asc' },
    });
    return destinations;
  }
}
