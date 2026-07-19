import { Test, TestingModule } from '@nestjs/testing';
import { DestinationController } from '../controllers/destination.controller';
import { DestinationService } from '../services/destination.service';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { CreateDestinationDto, UpdateDestinationDto } from '../dto/destination.dto';

describe('DestinationController', () => {
  let controller: DestinationController;
  let service: DestinationService;

  const mockUser: ValidatedUser = {
    id: 'user-uuid',
    email: 'traveler@example.com',
  };

  const mockDestination = {
    id: 'dest-uuid',
    tripId: 'trip-uuid',
    name: 'Eiffel Tower',
    order: 0,
  };

  const mockDestinationService = {
    addDestination: jest.fn(),
    updateDestination: jest.fn(),
    deleteDestination: jest.fn(),
    getDestinations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinationController],
      providers: [{ provide: DestinationService, useValue: mockDestinationService }],
    }).compile();

    controller = module.get<DestinationController>(DestinationController);
    service = module.get<DestinationService>(DestinationService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addDestination', () => {
    it('should invoke destinationService.addDestination', async () => {
      const dto: CreateDestinationDto = { name: 'Eiffel', order: 0 };
      mockDestinationService.addDestination.mockResolvedValue(mockDestination);

      const result = await controller.addDestination(mockUser, 'trip-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Destination added successfully',
        data: mockDestination,
      });
      expect(service.addDestination).toHaveBeenCalledWith(mockUser.id, 'trip-uuid', dto);
    });
  });

  describe('updateDestination', () => {
    it('should invoke destinationService.updateDestination', async () => {
      const dto: UpdateDestinationDto = { name: 'New Eiffel' };
      mockDestinationService.updateDestination.mockResolvedValue(mockDestination);

      const result = await controller.updateDestination(mockUser, 'dest-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Destination updated successfully',
        data: mockDestination,
      });
      expect(service.updateDestination).toHaveBeenCalledWith(mockUser.id, 'dest-uuid', dto);
    });
  });

  describe('deleteDestination', () => {
    it('should invoke destinationService.deleteDestination', async () => {
      mockDestinationService.deleteDestination.mockResolvedValue({});

      const result = await controller.deleteDestination(mockUser, 'dest-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Destination removed successfully',
      });
      expect(service.deleteDestination).toHaveBeenCalledWith(mockUser.id, 'dest-uuid');
    });
  });

  describe('getDestinations', () => {
    it('should invoke destinationService.getDestinations', async () => {
      mockDestinationService.getDestinations.mockResolvedValue([mockDestination]);

      const result = await controller.getDestinations(mockUser, 'trip-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Destinations retrieved successfully',
        data: [mockDestination],
      });
      expect(service.getDestinations).toHaveBeenCalledWith(mockUser.id, 'trip-uuid');
    });
  });
});
