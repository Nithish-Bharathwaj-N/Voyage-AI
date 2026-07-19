import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from '../controllers/trip.controller';
import { TripService } from '../services/trip.service';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { SendInvitationDto } from '../dto/invitation.dto';
import { CollaboratorRole } from '@prisma/client';

describe('TripController', () => {
  let controller: TripController;
  let service: TripService;

  const mockUser: ValidatedUser = {
    id: 'owner-uuid',
    email: 'owner@example.com',
  };

  const mockTrip = {
    id: 'trip-uuid',
    ownerId: 'owner-uuid',
    title: 'Paris Summer Tour',
    description: 'Museums and cafes',
    coverImage: 'https://example.com/cover.jpg',
    startDate: new Date(),
    endDate: new Date(),
    status: 'PLANNING',
    visibility: 'PRIVATE',
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

  const mockTripService = {
    createTrip: jest.fn(),
    getTrips: jest.fn(),
    getTrip: jest.fn(),
    updateTrip: jest.fn(),
    deleteTrip: jest.fn(),
    archiveTrip: jest.fn(),
    duplicateTrip: jest.fn(),
    sendInvitation: jest.fn(),
    removeMember: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [{ provide: TripService, useValue: mockTripService }],
    }).compile();

    controller = module.get<TripController>(TripController);
    service = module.get<TripService>(TripService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTrip', () => {
    it('should invoke tripService.createTrip', async () => {
      const dto: CreateTripDto = {
        title: 'Paris Tour',
        startDate: new Date(),
        endDate: new Date(),
      };
      mockTripService.createTrip.mockResolvedValue(mockTrip);

      const result = await controller.createTrip(mockUser, dto);
      expect(result).toEqual({
        success: true,
        message: 'Trip created successfully',
        data: mockTrip,
      });
      expect(service.createTrip).toHaveBeenCalledWith(mockUser.id, dto);
    });
  });

  describe('getTrips', () => {
    it('should invoke tripService.getTrips', async () => {
      mockTripService.getTrips.mockResolvedValue([mockTrip]);

      const result = await controller.getTrips(mockUser);
      expect(result).toEqual({
        success: true,
        message: 'Trips retrieved successfully',
        data: [mockTrip],
      });
      expect(service.getTrips).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getTrip', () => {
    it('should invoke tripService.getTrip', async () => {
      mockTripService.getTrip.mockResolvedValue(mockTrip);

      const result = await controller.getTrip(mockUser, 'trip-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Trip details retrieved successfully',
        data: mockTrip,
      });
      expect(service.getTrip).toHaveBeenCalledWith(mockUser.id, 'trip-uuid');
    });
  });

  describe('updateTrip', () => {
    it('should invoke tripService.updateTrip', async () => {
      const dto: UpdateTripDto = { title: 'Updated Title' };
      mockTripService.updateTrip.mockResolvedValue(mockTrip);

      const result = await controller.updateTrip(mockUser, 'trip-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Trip updated successfully',
        data: mockTrip,
      });
      expect(service.updateTrip).toHaveBeenCalledWith(mockUser.id, 'trip-uuid', dto);
    });
  });

  describe('deleteTrip', () => {
    it('should invoke tripService.deleteTrip', async () => {
      mockTripService.deleteTrip.mockResolvedValue({});

      const result = await controller.deleteTrip(mockUser, 'trip-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Trip deleted successfully',
      });
      expect(service.deleteTrip).toHaveBeenCalledWith(mockUser.id, 'trip-uuid');
    });
  });

  describe('archiveTrip', () => {
    it('should invoke tripService.archiveTrip', async () => {
      mockTripService.archiveTrip.mockResolvedValue(mockTrip);

      const result = await controller.archiveTrip(mockUser, 'trip-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Trip archived successfully',
        data: mockTrip,
      });
      expect(service.archiveTrip).toHaveBeenCalledWith(mockUser.id, 'trip-uuid');
    });
  });

  describe('duplicateTrip', () => {
    it('should invoke tripService.duplicateTrip', async () => {
      mockTripService.duplicateTrip.mockResolvedValue(mockTrip);

      const result = await controller.duplicateTrip(mockUser, 'trip-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Trip duplicated successfully',
        data: mockTrip,
      });
      expect(service.duplicateTrip).toHaveBeenCalledWith(mockUser.id, 'trip-uuid');
    });
  });

  describe('sendInvitation', () => {
    it('should invoke tripService.sendInvitation', async () => {
      const dto: SendInvitationDto = { inviteeEmail: 'a@a.com', role: CollaboratorRole.EDITOR };
      const mockInvite = { id: 'invite-uuid' };
      mockTripService.sendInvitation.mockResolvedValue(mockInvite);

      const result = await controller.sendInvitation(mockUser, 'trip-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Invitation sent successfully',
        data: mockInvite,
      });
      expect(service.sendInvitation).toHaveBeenCalledWith(mockUser.id, 'trip-uuid', dto);
    });
  });

  describe('removeMember', () => {
    it('should invoke tripService.removeMember', async () => {
      mockTripService.removeMember.mockResolvedValue({});

      const result = await controller.removeMember(mockUser, 'trip-uuid', 'member-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Member removed successfully',
      });
      expect(service.removeMember).toHaveBeenCalledWith(mockUser.id, 'trip-uuid', 'member-uuid');
    });
  });
});
