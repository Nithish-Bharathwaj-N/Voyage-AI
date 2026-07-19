import { Test, TestingModule } from '@nestjs/testing';
import { DestinationService } from '../services/destination.service';
import { TripService } from '../services/trip.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateDestinationDto, UpdateDestinationDto } from '../dto/destination.dto';

describe('DestinationService', () => {
  let service: DestinationService;

  const mockDestinationRecord = {
    id: 'dest-uuid',
    tripId: 'trip-uuid',
    name: 'Eiffel Tower',
    latitude: 48.8584,
    longitude: 2.2945,
    country: 'France',
    city: 'Paris',
    arrivalDate: new Date(),
    departureDate: new Date(),
    notes: 'Book tickets',
    order: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    destination: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
    },
  };

  const mockTripService = {
    verifyAccess: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinationService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: TripService, useValue: mockTripService },
      ],
    }).compile();

    service = module.get<DestinationService>(DestinationService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addDestination', () => {
    it('should create destination record successfully', async () => {
      const dto: CreateDestinationDto = {
        name: 'Eiffel Tower',
        latitude: 48.8584,
        longitude: 2.2945,
        country: 'France',
        city: 'Paris',
        order: 0,
      };

      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.destination.create.mockResolvedValue(mockDestinationRecord);

      const result = await service.addDestination('user-uuid', 'trip-uuid', dto);
      expect(result).toEqual(mockDestinationRecord);
      expect(mockTripService.verifyAccess).toHaveBeenCalled();
      expect(mockPrismaService.destination.create).toHaveBeenCalled();
    });
  });

  describe('updateDestination', () => {
    it('should update destination details', async () => {
      const dto: UpdateDestinationDto = { name: 'Louvre' };
      const updatedDest = { ...mockDestinationRecord, name: 'Louvre' };

      mockPrismaService.destination.findUnique.mockResolvedValue(mockDestinationRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.destination.update.mockResolvedValue(updatedDest);

      const result = await service.updateDestination('user-uuid', 'dest-uuid', dto);
      expect(result.name).toBe('Louvre');
      expect(mockPrismaService.destination.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if destination does not exist', async () => {
      mockPrismaService.destination.findUnique.mockResolvedValue(null);

      await expect(
        service.updateDestination('user-uuid', 'dest-uuid', { name: 'Louvre' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteDestination', () => {
    it('should successfully remove a destination', async () => {
      mockPrismaService.destination.findUnique.mockResolvedValue(mockDestinationRecord);
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.destination.delete.mockResolvedValue({});

      const result = await service.deleteDestination('user-uuid', 'dest-uuid');
      expect(result).toEqual({});
      expect(mockPrismaService.destination.delete).toHaveBeenCalled();
    });
  });

  describe('getDestinations', () => {
    it('should return trip destinations ordered by order field', async () => {
      mockTripService.verifyAccess.mockResolvedValue({});
      mockPrismaService.destination.findMany.mockResolvedValue([mockDestinationRecord]);

      const result = await service.getDestinations('user-uuid', 'trip-uuid');
      expect(result).toEqual([mockDestinationRecord]);
      expect(mockPrismaService.destination.findMany).toHaveBeenCalled();
    });
  });
});
