import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from '../services/trip.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CollaboratorRole, TripVisibility, TripStatus, InvitationStatus } from '@prisma/client';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { SendInvitationDto } from '../dto/invitation.dto';

describe('TripService', () => {
  let service: TripService;

  const mockTripRecord = {
    id: 'trip-uuid',
    ownerId: 'owner-uuid',
    title: 'Paris Summer Tour',
    description: 'Museums and cafes',
    coverImage: 'https://example.com/cover.jpg',
    startDate: new Date('2026-07-01T00:00:00.000Z'),
    endDate: new Date('2026-07-10T00:00:00.000Z'),
    status: TripStatus.PLANNING,
    visibility: TripVisibility.PRIVATE,
    currency: 'USD',
    estimatedBudget: 2500,
    actualBudget: 0,
    country: 'France',
    city: 'Paris',
    timezone: 'Europe/Paris',
    isArchived: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockMemberRecord = {
    id: 'member-uuid',
    tripId: 'trip-uuid',
    userId: 'owner-uuid',
    role: CollaboratorRole.OWNER,
  };

  const mockPrismaService = {
    $transaction: jest
      .fn()
      .mockImplementation((cb: (tx: unknown) => Promise<unknown>) => cb(mockPrismaService)),
    trip: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    tripMember: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
    destination: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
    tripActivity: {
      create: jest.fn(),
    },
    tripInvitation: {
      create: jest.fn(),
    },
    tripStatusHistory: {
      create: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<TripService>(TripService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTrip', () => {
    it('should successfully create a trip and register caller as OWNER', async () => {
      const dto: CreateTripDto = {
        title: 'Paris Summer Tour',
        description: 'Museums and cafes',
        coverImage: 'https://example.com/cover.jpg',
        startDate: new Date('2026-07-01T00:00:00.000Z'),
        endDate: new Date('2026-07-10T00:00:00.000Z'),
        visibility: TripVisibility.PRIVATE,
        currency: 'USD',
        estimatedBudget: 2500,
        country: 'France',
        city: 'Paris',
        timezone: 'Europe/Paris',
      };

      mockPrismaService.trip.create.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.create.mockResolvedValue(mockMemberRecord);

      const result = await service.createTrip('owner-uuid', dto);
      expect(result).toEqual(mockTripRecord);
      expect(mockPrismaService.trip.create).toHaveBeenCalled();
      expect(mockPrismaService.tripMember.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if end date is before start date', async () => {
      const dto: CreateTripDto = {
        title: 'Invalid Dates',
        startDate: new Date('2026-07-10T00:00:00.000Z'),
        endDate: new Date('2026-07-01T00:00:00.000Z'),
      };

      await expect(service.createTrip('owner-uuid', dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('verifyAccess', () => {
    it('should return trip if user is a member with allowed role', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);

      const result = await service.verifyAccess('trip-uuid', 'owner-uuid', [
        CollaboratorRole.OWNER,
      ]);
      expect(result).toEqual(mockTripRecord);
    });

    it('should throw ForbiddenException if user has no role/membership', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(null);

      await expect(
        service.verifyAccess('trip-uuid', 'stranger-uuid', [CollaboratorRole.OWNER]),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if trip does not exist', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(null);

      await expect(
        service.verifyAccess('trip-uuid', 'owner-uuid', [CollaboratorRole.OWNER]),
      ).rejects.toThrow(NotFoundException);
    });

    it('should allow public read on public trips even without membership', async () => {
      const publicTrip = { ...mockTripRecord, visibility: TripVisibility.PUBLIC };
      mockPrismaService.trip.findUnique.mockResolvedValue(publicTrip);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(null);

      const result = await service.verifyAccess(
        'trip-uuid',
        'stranger-uuid',
        [CollaboratorRole.VIEWER],
        true,
      );
      expect(result).toEqual(publicTrip);
    });
  });

  describe('updateTrip', () => {
    it('should update trip and write status history if status changes', async () => {
      const dto: UpdateTripDto = { title: 'New Paris', status: TripStatus.ONGOING };
      const updatedTrip = { ...mockTripRecord, title: 'New Paris', status: TripStatus.ONGOING };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);
      mockPrismaService.trip.update.mockResolvedValue(updatedTrip);
      mockPrismaService.tripStatusHistory.create.mockResolvedValue({});

      const result = await service.updateTrip('owner-uuid', 'trip-uuid', dto);
      expect(result.title).toBe('New Paris');
      expect(mockPrismaService.tripStatusHistory.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid date update combinations', async () => {
      const dto: UpdateTripDto = {
        startDate: new Date('2026-07-20T00:00:00.000Z'),
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);

      await expect(service.updateTrip('owner-uuid', 'trip-uuid', dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('duplicateTrip', () => {
    it('should duplicate original trip metadata, destinations, and activities', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);
      mockPrismaService.destination.findMany.mockResolvedValue([
        {
          id: 'dest-uuid',
          name: 'Eiffel',
          order: 0,
          activities: [{ id: 'act-uuid', name: 'Climb', order: 0 }],
        },
      ]);

      const duplicatedTrip = {
        ...mockTripRecord,
        id: 'copy-uuid',
        title: 'Paris Summer Tour - Copy',
      };
      mockPrismaService.trip.create.mockResolvedValue(duplicatedTrip);
      mockPrismaService.destination.create.mockResolvedValue({ id: 'copy-dest-uuid' });
      mockPrismaService.tripActivity.create.mockResolvedValue({});

      const result = await service.duplicateTrip('owner-uuid', 'trip-uuid');
      expect(result.title).toBe('Paris Summer Tour - Copy');
      expect(mockPrismaService.trip.create).toHaveBeenCalled();
      expect(mockPrismaService.destination.create).toHaveBeenCalled();
      expect(mockPrismaService.tripActivity.create).toHaveBeenCalled();
    });
  });

  describe('sendInvitation', () => {
    it('should create a pending invitation record successfully', async () => {
      const dto: SendInvitationDto = {
        inviteeEmail: 'collaborator@example.com',
        role: CollaboratorRole.EDITOR,
      };
      const expectedInvitation = {
        id: 'invite-uuid',
        tripId: 'trip-uuid',
        inviterId: 'owner-uuid',
        inviteeEmail: 'collaborator@example.com',
        role: CollaboratorRole.EDITOR,
        status: InvitationStatus.PENDING,
        token: 'token-xyz',
        expiresAt: new Date(),
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.tripInvitation.create.mockResolvedValue(expectedInvitation);

      const result = await service.sendInvitation('owner-uuid', 'trip-uuid', dto);
      expect(result).toEqual(expectedInvitation);
      expect(mockPrismaService.tripInvitation.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if invitee is already collaborator member', async () => {
      const dto: SendInvitationDto = {
        inviteeEmail: 'collaborator@example.com',
        role: CollaboratorRole.EDITOR,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);

      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'collaborator-uuid' });
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // owner check
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce({ id: 'member-collab-uuid' }); // already member check

      await expect(service.sendInvitation('owner-uuid', 'trip-uuid', dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getTrips', () => {
    it('should return list of trips associated with user', async () => {
      mockPrismaService.trip.findMany.mockResolvedValue([mockTripRecord]);

      const result = await service.getTrips('owner-uuid');
      expect(result).toEqual([mockTripRecord]);
      expect(mockPrismaService.trip.findMany).toHaveBeenCalled();
    });
  });

  describe('getTrip', () => {
    it('should return single trip details if user is authorized', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);

      const result = await service.getTrip('owner-uuid', 'trip-uuid');
      expect(result).toEqual(mockTripRecord);
    });
  });

  describe('deleteTrip', () => {
    it('should delete trip successfully if user is owner', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);
      mockPrismaService.trip.delete.mockResolvedValue({});

      const result = await service.deleteTrip('owner-uuid', 'trip-uuid');
      expect(result).toEqual({});
      expect(mockPrismaService.trip.delete).toHaveBeenCalled();
    });
  });

  describe('archiveTrip', () => {
    it('should set isArchived true successfully if user is owner', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValue(mockMemberRecord);
      mockPrismaService.trip.update.mockResolvedValue({ ...mockTripRecord, isArchived: true });

      const result = await service.archiveTrip('owner-uuid', 'trip-uuid');
      expect(result.isArchived).toBe(true);
      expect(mockPrismaService.trip.update).toHaveBeenCalled();
    });
  });

  describe('removeMember', () => {
    it('should remove trip member collaborator successfully', async () => {
      const targetMember = {
        id: 'collab-member-uuid',
        tripId: 'trip-uuid',
        role: CollaboratorRole.EDITOR,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // owner access check
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(targetMember); // lookup target
      mockPrismaService.tripMember.delete.mockResolvedValue({});

      const result = await service.removeMember('owner-uuid', 'trip-uuid', 'collab-member-uuid');
      expect(result).toEqual({});
      expect(mockPrismaService.tripMember.delete).toHaveBeenCalled();
    });

    it('should throw BadRequestException if owner attempts to remove themselves', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // owner access check
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // lookup target (owner itself)

      await expect(
        service.removeMember('owner-uuid', 'trip-uuid', 'owner-member-uuid'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if member record does not exist', async () => {
      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // owner access check
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(null); // lookup target

      await expect(
        service.removeMember('owner-uuid', 'trip-uuid', 'unknown-member'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if member does not belong to this trip', async () => {
      const wrongMember = {
        id: 'collab-member-uuid',
        tripId: 'other-trip-uuid',
        role: CollaboratorRole.EDITOR,
      };

      mockPrismaService.trip.findUnique.mockResolvedValue(mockTripRecord);
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(mockMemberRecord); // owner access check
      mockPrismaService.tripMember.findUnique.mockResolvedValueOnce(wrongMember); // lookup target

      await expect(
        service.removeMember('owner-uuid', 'trip-uuid', 'collab-member-uuid'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
