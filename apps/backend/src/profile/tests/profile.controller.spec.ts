import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from '../controllers/profile.controller';
import { ProfileService } from '../services/profile.service';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { BadRequestException } from '@nestjs/common';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  const mockUser: ValidatedUser = {
    id: 'user-uuid',
    email: 'traveler@example.com',
  };

  const mockProfile = {
    id: 'profile-uuid',
    userId: 'user-uuid',
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'https://example.com/avatar.jpg',
    bio: 'Traveler bio',
    country: 'US',
    city: 'NY',
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    profileCompletion: 80,
    isOnboarded: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProfileService = {
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    uploadAvatar: jest.fn(),
    deleteAvatar: jest.fn(),
    getPreferences: jest.fn(),
    updatePreferences: jest.fn(),
    getOnboarding: jest.fn(),
    updateOnboarding: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [{ provide: ProfileService, useValue: mockProfileService }],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return profile data', async () => {
      mockProfileService.getProfile.mockResolvedValue(mockProfile);

      const result = await controller.getProfile(mockUser);
      expect(result).toEqual({
        success: true,
        message: 'Operation completed successfully',
        data: mockProfile,
      });
      expect(service.getProfile).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateProfile', () => {
    it('should invoke profileService.updateProfile', async () => {
      const dto = { bio: 'New bio' };
      mockProfileService.updateProfile.mockResolvedValue({ ...mockProfile, bio: 'New bio' });

      const result = await controller.updateProfile(mockUser, dto);
      expect(result.success).toBe(true);
      expect(result.data.bio).toBe('New bio');
      expect(service.updateProfile).toHaveBeenCalledWith(mockUser.id, dto);
    });
  });

  describe('uploadAvatar', () => {
    const mockFile = {
      fieldname: 'file',
      originalname: 'test.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from('mock-file-content'),
      size: 1000,
    } as Express.Multer.File;

    it('should invoke profileService.uploadAvatar', async () => {
      mockProfileService.uploadAvatar.mockResolvedValue({ avatarUrl: 'new-url' });

      const result = await controller.uploadAvatar(mockUser, mockFile);
      expect(result).toEqual({
        success: true,
        message: 'Avatar uploaded successfully',
        data: { avatarUrl: 'new-url' },
      });
      expect(service.uploadAvatar).toHaveBeenCalledWith(mockUser.id, mockFile);
    });

    it('should throw BadRequestException if file is missing', async () => {
      await expect(
        controller.uploadAvatar(mockUser, null as unknown as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('deleteAvatar', () => {
    it('should invoke profileService.deleteAvatar', async () => {
      mockProfileService.deleteAvatar.mockResolvedValue({});

      const result = await controller.deleteAvatar(mockUser);
      expect(result).toEqual({
        success: true,
        message: 'Avatar removed successfully',
      });
      expect(service.deleteAvatar).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('getPreferences', () => {
    it('should invoke profileService.getPreferences', async () => {
      const prefs = { travelStyle: 'Adventure' };
      mockProfileService.getPreferences.mockResolvedValue(prefs);

      const result = await controller.getPreferences(mockUser);
      expect(result).toEqual({
        success: true,
        message: 'Operation completed successfully',
        data: prefs,
      });
      expect(service.getPreferences).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updatePreferences', () => {
    it('should invoke profileService.updatePreferences', async () => {
      const dto = { travelStyle: 'Luxury' };
      const updatedPrefs = { travelStyle: 'Luxury' };
      mockProfileService.updatePreferences.mockResolvedValue(updatedPrefs);

      const result = await controller.updatePreferences(mockUser, dto);
      expect(result).toEqual({
        success: true,
        message: 'Preferences updated successfully',
        data: updatedPrefs,
      });
      expect(service.updatePreferences).toHaveBeenCalledWith(mockUser.id, dto);
    });
  });

  describe('getOnboarding', () => {
    it('should invoke profileService.getOnboarding', async () => {
      const onboarding = { isOnboarded: false };
      mockProfileService.getOnboarding.mockResolvedValue(onboarding);

      const result = await controller.getOnboarding(mockUser);
      expect(result).toEqual({
        success: true,
        message: 'Operation completed successfully',
        data: onboarding,
      });
      expect(service.getOnboarding).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('updateOnboarding', () => {
    it('should invoke profileService.updateOnboarding', async () => {
      const dto = { isOnboarded: true };
      const updatedOnboarding = { isOnboarded: true };
      mockProfileService.updateOnboarding.mockResolvedValue(updatedOnboarding);

      const result = await controller.updateOnboarding(mockUser, dto);
      expect(result).toEqual({
        success: true,
        message: 'Onboarding progress updated successfully',
        data: updatedOnboarding,
      });
      expect(service.updateOnboarding).toHaveBeenCalledWith(mockUser.id, dto);
    });
  });
});
