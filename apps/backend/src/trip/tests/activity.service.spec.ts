import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../services/activity.service';
import { TripService } from '../services/trip.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateActivityDto, UpdateActivityDto } from '../dto/activity.dto';

describe('ActivityService', () => {
  let service: ActivityService;

  const mockActivityRecord = {
    id: 'act-uuid',
    destinationId: 'dest-uuid',
    tripId: 'trip-uuid',
    name: 'Museum visit',
    description: 'Louvre tour',
    locationName: 'Paris',
    latitude: 48.8606,
    longitude: 2.3376,
    startTime: new Date(),
    endTime: new Date(),
    cost: 20,
    notes: 'Use ticket',
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDestinationRecord = {
    id: 'dest-uuid',
    tripId: 'trip-uuid',
    name: 'Paris Hub',
  };

  const mockPrismaService = {
    tripActivity: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
    destination: {
      findUnique: jest.fn(),
    },
  };

  const mockTripService = {
    verifyAccess: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TripService, useValue: mockTripService },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addActivity', () => {
    it('should add activity successfully', async () => {
      const dto: CreateActivityDto = {
        name: 'Museum visit',
        order: 0,
      };

      mockPrismaService.destination.findUnique.mockResolvedValue(mockDestinationRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.tripActivity.create.mockResolvedValue(mockActivityRecord);

      const result = await service.addActivity('user-uuid', 'dest-uuid', dto);
      expect(result).toEqual(mockActivityRecord);
      expect(mockPrismaService.destination.findUnique).toHaveBeenCalledWith({
        where: { id: 'dest-uuid' },
      });
      expect(mockTripService.verifyAccess).toHaveBeenCalled();
    });

    it('should throw NotFoundException if parent destination does not exist', async () => {
      mockPrismaService.destination.findUnique.mockResolvedValue(null);

      await expect(
        service.addActivity('user-uuid', 'dest-uuid', { name: 'Visit', order: 0 }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateActivity', () => {
    it('should update activity details', async () => {
      const dto: UpdateActivityDto = { name: 'Louvre Tour' };
      const updated = { ...mockActivityRecord, name: 'Louvre Tour' };

      mockPrismaService.tripActivity.findUnique.mockResolvedValue(mockActivityRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.tripActivity.update.mockResolvedValue(updated);

      const result = await service.updateActivity('user-uuid', 'act-uuid', dto);
      expect(result.name).toBe('Louvre Tour');
      expect(mockPrismaService.tripActivity.update).toHaveBeenCalled();
    });
  });

  describe('deleteActivity', () => {
    it('should delete activity successfully', async () => {
      mockPrismaService.tripActivity.findUnique.mockResolvedValue(mockActivityRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.tripActivity.delete.mockResolvedValue({});

      const result = await service.deleteActivity('user-uuid', 'act-uuid');
      expect(result).toEqual({});
      expect(mockPrismaService.tripActivity.delete).toHaveBeenCalled();
    });
  });

  describe('getActivities', () => {
    it('should retrieve list of activities in order', async () => {
      mockPrismaService.destination.findUnique.mockResolvedValue(mockDestinationRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.tripActivity.findMany.mockResolvedValue([mockActivityRecord]);

      const result = await service.getActivities('user-uuid', 'dest-uuid');
      expect(result).toEqual([mockActivityRecord]);
      expect(mockPrismaService.tripActivity.findMany).toHaveBeenCalled();
    });
  });
});
