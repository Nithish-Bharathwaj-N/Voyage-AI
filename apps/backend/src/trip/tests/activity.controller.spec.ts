import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from '../controllers/activity.controller';
import { ActivityService } from '../services/activity.service';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { CreateActivityDto, UpdateActivityDto } from '../dto/activity.dto';

describe('ActivityController', () => {
  let controller: ActivityController;
  let service: ActivityService;

  const mockUser: ValidatedUser = {
    id: 'user-uuid',
    email: 'traveler@example.com',
  };

  const mockActivity = {
    id: 'act-uuid',
    destinationId: 'dest-uuid',
    name: '参观卢浮宫 (Louvre Museum Tour)',
    order: 0,
  };

  const mockActivityService = {
    addActivity: jest.fn(),
    updateActivity: jest.fn(),
    deleteActivity: jest.fn(),
    getActivities: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [{ provide: ActivityService, useValue: mockActivityService }],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addActivity', () => {
    it('should invoke activityService.addActivity', async () => {
      const dto: CreateActivityDto = { name: 'Museum Visit', order: 0 };
      mockActivityService.addActivity.mockResolvedValue(mockActivity);

      const result = await controller.addActivity(mockUser, 'dest-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Activity added successfully',
        data: mockActivity,
      });
      expect(service.addActivity).toHaveBeenCalledWith(mockUser.id, 'dest-uuid', dto);
    });
  });

  describe('updateActivity', () => {
    it('should invoke activityService.updateActivity', async () => {
      const dto: UpdateActivityDto = { name: 'New Museum Visit' };
      mockActivityService.updateActivity.mockResolvedValue(mockActivity);

      const result = await controller.updateActivity(mockUser, 'act-uuid', dto);
      expect(result).toEqual({
        success: true,
        message: 'Activity updated successfully',
        data: mockActivity,
      });
      expect(service.updateActivity).toHaveBeenCalledWith(mockUser.id, 'act-uuid', dto);
    });
  });

  describe('deleteActivity', () => {
    it('should invoke activityService.deleteActivity', async () => {
      mockActivityService.deleteActivity.mockResolvedValue({});

      const result = await controller.deleteActivity(mockUser, 'act-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Activity removed successfully',
      });
      expect(service.deleteActivity).toHaveBeenCalledWith(mockUser.id, 'act-uuid');
    });
  });

  describe('getActivities', () => {
    it('should invoke activityService.getActivities', async () => {
      mockActivityService.getActivities.mockResolvedValue([mockActivity]);

      const result = await controller.getActivities(mockUser, 'dest-uuid');
      expect(result).toEqual({
        success: true,
        message: 'Activities retrieved successfully',
        data: [mockActivity],
      });
      expect(service.getActivities).toHaveBeenCalledWith(mockUser.id, 'dest-uuid');
    });
  });
});
