import {
  Injectable,
  Logger,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Trip, CollaboratorRole, TripVisibility, InvitationStatus, TripStatus } from '@prisma/client';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { SendInvitationDto, InvitationResponseData } from '../dto/invitation.dto';
import { TripResponseData } from '../dto/trip-response.dto';
import { CreateTripFromItineraryDto } from '../dto/from-itinerary.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TripService {
  private readonly logger = new Logger(TripService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Helper: Check if a user is a member of a trip and return their role.
   * If not a member, returns null.
   */
  private async getMemberRole(tripId: string, userId: string): Promise<CollaboratorRole | null> {
    const member = await this.prisma.tripMember.findUnique({
      where: {
        tripId_userId: { tripId, userId },
      },
    });
    return member ? member.role : null;
  }

  /**
   * Helper: Verify user has specific roles on a trip.
   * If the trip is PUBLIC, viewers are allowed read access even without membership.
   */
  async verifyAccess(
    tripId: string,
    userId: string,
    allowedRoles: CollaboratorRole[],
    allowPublicRead = false,
  ): Promise<Trip> {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip) {
      this.logger.error(`Trip not found for ID: ${tripId}`);
      throw new NotFoundException('Trip not found');
    }

    const role = await this.getMemberRole(tripId, userId);

    if (role && allowedRoles.includes(role)) {
      return trip;
    }

    if (allowPublicRead && trip.visibility === TripVisibility.PUBLIC) {
      return trip;
    }

    this.logger.warn(`Unauthorized access attempt by user ${userId} on trip ${tripId}`);
    throw new ForbiddenException('You do not have permission to access this trip');
  }

  /**
   * Create a new trip and add creator as OWNER
   */
  async createTrip(userId: string, dto: CreateTripDto): Promise<TripResponseData> {
    if (dto.endDate < dto.startDate) {
      throw new BadRequestException('End date cannot be before start date');
    }

    const trip = await this.prisma.$transaction(async (tx) => {
      const newTrip = await tx.trip.create({
        data: {
          ownerId: userId,
          title: dto.title,
          description: dto.description,
          coverImage: dto.coverImage,
          startDate: dto.startDate,
          endDate: dto.endDate,
          visibility: dto.visibility ?? TripVisibility.PRIVATE,
          currency: dto.currency ?? 'USD',
          estimatedBudget: dto.estimatedBudget,
          country: dto.country,
          city: dto.city,
          timezone: dto.timezone ?? 'UTC',
        },
      });

      await tx.tripMember.create({
        data: {
          tripId: newTrip.id,
          userId: userId,
          role: CollaboratorRole.OWNER,
        },
      });

      return newTrip;
    });

    this.logger.log(`Trip Created: ${trip.id} by user ${userId}`);
    return trip;
  }

  /**
   * Retrieve list of trips the user is collaborator/owner of
   */
  async getTrips(userId: string): Promise<TripResponseData[]> {
    const trips = await this.prisma.trip.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    return trips;
  }

  /**
   * Get all upcoming activities for the user across all active trips
   */
  async getUpcomingActivities(userId: string) {
    const upcomingTrips = await this.prisma.trip.findMany({
      where: {
        ownerId: userId,
        isArchived: false,
        status: { in: [TripStatus.PLANNING, TripStatus.ONGOING] }
      },
      select: { id: true }
    });
    
    const tripIds = upcomingTrips.map(t => t.id);
    
    if (tripIds.length === 0) return [];
    
    return this.prisma.tripActivity.findMany({
      where: {
        tripId: { in: tripIds },
        startTime: { gte: new Date() }
      },
      orderBy: { startTime: 'asc' },
      take: 20
    });
  }

  /**
   * Retrieve single trip details
   */
  async getTrip(userId: string, id: string): Promise<TripResponseData> {
    const trip = await this.verifyAccess(
      id,
      userId,
      [CollaboratorRole.OWNER, CollaboratorRole.EDITOR, CollaboratorRole.VIEWER],
      true,
    );
    return trip;
  }

  /**
   * Update trip details
   */
  async updateTrip(userId: string, id: string, dto: UpdateTripDto): Promise<TripResponseData> {
    const trip = await this.verifyAccess(id, userId, [
      CollaboratorRole.OWNER,
      CollaboratorRole.EDITOR,
    ]);

    if (dto.startDate && dto.endDate && dto.endDate < dto.startDate) {
      throw new BadRequestException('End date cannot be before start date');
    } else if (dto.startDate && !dto.endDate && trip.endDate < dto.startDate) {
      throw new BadRequestException('End date cannot be before start date');
    } else if (!dto.startDate && dto.endDate && dto.endDate < trip.startDate) {
      throw new BadRequestException('End date cannot be before start date');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const updatedTrip = await tx.trip.update({
        where: { id },
        data: {
          title: dto.title,
          description: dto.description,
          coverImage: dto.coverImage,
          startDate: dto.startDate,
          endDate: dto.endDate,
          visibility: dto.visibility,
          status: dto.status,
          currency: dto.currency,
          estimatedBudget: dto.estimatedBudget,
          country: dto.country,
          city: dto.city,
          timezone: dto.timezone,
        },
      });

      if (dto.status && dto.status !== trip.status) {
        await tx.tripStatusHistory.create({
          data: {
            tripId: id,
            oldStatus: trip.status,
            newStatus: dto.status,
            changedById: userId,
            reason: 'User manual status update',
          },
        });
      }

      return updatedTrip;
    });

    this.logger.log(`Trip Updated: ${id} by user ${userId}`);
    return updated;
  }

  /**
   * Delete trip
   */
  async deleteTrip(userId: string, id: string): Promise<Record<string, never>> {
    await this.verifyAccess(id, userId, [CollaboratorRole.OWNER]);

    await this.prisma.trip.delete({
      where: { id },
    });

    this.logger.log(`Trip Deleted: ${id} by user ${userId}`);
    return {};
  }

  /**
   * Archive a trip
   */
  async archiveTrip(userId: string, id: string): Promise<TripResponseData> {
    await this.verifyAccess(id, userId, [CollaboratorRole.OWNER]);

    const updated = await this.prisma.trip.update({
      where: { id },
      data: { isArchived: true },
    });

    this.logger.log(`Trip Archived: ${id} by user ${userId}`);
    return updated;
  }

  /**
   * Duplicate a trip (clones metadata, destinations, activities)
   */
  async duplicateTrip(userId: string, id: string): Promise<TripResponseData> {
    const originalTrip = await this.verifyAccess(
      id,
      userId,
      [CollaboratorRole.OWNER, CollaboratorRole.EDITOR, CollaboratorRole.VIEWER],
      true,
    );

    const destinations = await this.prisma.destination.findMany({
      where: { tripId: id },
      include: { activities: true },
    });

    const duplicated = await this.prisma.$transaction(async (tx) => {
      const newTrip = await tx.trip.create({
        data: {
          ownerId: userId,
          title: `${originalTrip.title} - Copy`,
          description: originalTrip.description,
          coverImage: originalTrip.coverImage,
          startDate: originalTrip.startDate,
          endDate: originalTrip.endDate,
          visibility: TripVisibility.PRIVATE,
          currency: originalTrip.currency,
          estimatedBudget: originalTrip.estimatedBudget,
          country: originalTrip.country,
          city: originalTrip.city,
          timezone: originalTrip.timezone,
        },
      });

      await tx.tripMember.create({
        data: {
          tripId: newTrip.id,
          userId: userId,
          role: CollaboratorRole.OWNER,
        },
      });

      for (const dest of destinations) {
        const newDest = await tx.destination.create({
          data: {
            tripId: newTrip.id,
            name: dest.name,
            latitude: dest.latitude,
            longitude: dest.longitude,
            country: dest.country,
            city: dest.city,
            arrivalDate: dest.arrivalDate,
            departureDate: dest.departureDate,
            notes: dest.notes,
            order: dest.order,
          },
        });

        for (const act of dest.activities) {
          await tx.tripActivity.create({
            data: {
              tripId: newTrip.id,
              destinationId: newDest.id,
              name: act.name,
              description: act.description,
              locationName: act.locationName,
              latitude: act.latitude,
              longitude: act.longitude,
              startTime: act.startTime,
              endTime: act.endTime,
              cost: act.cost,
              notes: act.notes,
              order: act.order,
            },
          });
        }
      }

      return newTrip;
    });

    this.logger.log(
      `Trip Duplicated: original=${id} duplicated=${duplicated.id} by user ${userId}`,
    );
    return duplicated;
  }

  /**
   * Send collaboration invitation
   */
  async sendInvitation(
    userId: string,
    id: string,
    dto: SendInvitationDto,
  ): Promise<InvitationResponseData> {
    await this.verifyAccess(id, userId, [CollaboratorRole.OWNER]);

    // Check if user is already a member
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.inviteeEmail },
    });

    if (existingUser) {
      const member = await this.prisma.tripMember.findUnique({
        where: {
          tripId_userId: { tripId: id, userId: existingUser.id },
        },
      });
      if (member) {
        throw new BadRequestException('User is already a member of this trip');
      }
    }

    const invitation = await this.prisma.tripInvitation.create({
      data: {
        tripId: id,
        inviterId: userId,
        inviteeEmail: dto.inviteeEmail,
        role: dto.role,
        status: InvitationStatus.PENDING,
        token: randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
      },
    });

    this.logger.log(`Invitation Sent: ${invitation.id} for trip ${id} by user ${userId}`);
    return invitation;
  }

  /**
   * Remove member from trip collaboration
   */
  async removeMember(userId: string, id: string, memberId: string): Promise<Record<string, never>> {
    await this.verifyAccess(id, userId, [CollaboratorRole.OWNER]);

    const member = await this.prisma.tripMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.tripId !== id) {
      throw new BadRequestException('Member does not belong to this trip');
    }

    if (member.role === CollaboratorRole.OWNER) {
      throw new BadRequestException('Cannot remove the owner of the trip');
    }

    await this.prisma.tripMember.delete({
      where: { id: memberId },
    });

    this.logger.log(`Member Removed: ${memberId} from trip ${id} by user ${userId}`);
    return {};
  }

  /**
   * Create a Trip entity from an AI-generated Itinerary object.
   * Maps itinerary days → Destinations, activities → TripActivities.
   */
  async createFromItinerary(
    userId: string,
    dto: CreateTripFromItineraryDto,
  ): Promise<TripResponseData> {
    const { itinerary, startDate, endDate, currency, estimatedBudget } = dto;

    const trip = await this.prisma.$transaction(async (tx) => {
      // Create the root trip
      const newTrip = await tx.trip.create({
        data: {
          ownerId: userId,
          title: itinerary.destination || 'AI-Generated Trip',
          description: `AI-planned trip to ${itinerary.destination}`,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          currency: currency || itinerary.currency || 'USD',
          estimatedBudget: estimatedBudget || itinerary.budgetLimit || itinerary.budget || null,
          country: itinerary.country || null,
          city: itinerary.destination || null,
          timezone: 'UTC',
        },
      });

      // Add owner as member
      await tx.tripMember.create({
        data: { tripId: newTrip.id, userId, role: CollaboratorRole.OWNER },
      });

      // Create destinations + activities from each day
      if (Array.isArray(itinerary.days)) {
        for (let dayIdx = 0; dayIdx < itinerary.days.length; dayIdx++) {
          const day = itinerary.days[dayIdx];
          const dayDate = new Date(new Date(startDate).getTime() + dayIdx * 86400000);

          const dest = await tx.destination.create({
            data: {
              tripId: newTrip.id,
              name: day.location || itinerary.destination || `Day ${dayIdx + 1}`,
              country: itinerary.country || null,
              city: day.location || itinerary.destination || null,
              arrivalDate: dayDate,
              departureDate: dayDate,
              order: dayIdx,
              notes: day.theme || null,
            },
          });

          if (Array.isArray(day.activities)) {
            for (let actIdx = 0; actIdx < day.activities.length; actIdx++) {
              const act = day.activities[actIdx];

              // Handle start/end times safely
              let startTime: Date | null = null;
              const endTime: Date | null = null;
              const dateStr = dayDate.toISOString().split('T')[0];

              if (act.time && typeof act.time === 'string') {
                const timeMatch = act.time.match(/(\d{1,2}):(\d{2})/);
                if (timeMatch) {
                  startTime = new Date(
                    `${dateStr}T${timeMatch[1].padStart(2, '0')}:${timeMatch[2]}:00Z`,
                  );
                }
              }

              await tx.tripActivity.create({
                data: {
                  tripId: newTrip.id,
                  destinationId: dest.id,
                  name: act.activity || act.name || 'Activity',
                  description: act.reason || act.description || null,
                  locationName: act.location || null,
                  latitude: act.coordinates?.latitude || null,
                  longitude: act.coordinates?.longitude || null,
                  startTime,
                  endTime,
                  cost: act.estimatedCost || act.cost || null,
                  notes: act.warnings && act.warnings.length > 0 ? act.warnings.join('. ') : null,
                  order: actIdx,
                },
              });
            }
          }
        }
      }

      return newTrip;
    });

    this.logger.log(`Trip created from AI itinerary: ${trip.id} by user ${userId}`);
    return trip;
  }
}
