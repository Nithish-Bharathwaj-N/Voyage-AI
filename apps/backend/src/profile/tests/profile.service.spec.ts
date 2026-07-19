import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from '../services/profile.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../common/supabase/supabase.service';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;

  const mockProfileRecord = {
    id: 'profile-uuid',
    userId: 'user-uuid',
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'https://example.com/avatars/user-uuid/avatar-1466967980.jpg',
    bio: 'Traveler bio',
    country: 'US',
    city: 'NY',
    language: 'en',
    currency: 'USD',
    timezone: 'UTC',
    travelStyle: 'Adventure',
    budgetRange: 'Mid-range',
    preferredClimate: 'Temperate',
    favoriteActivities: ['Hiking'],
    preferredTransport: 'Train',
    dietaryPreferences: ['None'],
    accessibilityNeeds: [],
    travelCompanions: 'Solo',
    passportCountry: 'US',
    profileCompletion: 80,
    isOnboarded: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    profile: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockSupabaseClient = {
    storage: {
      from: jest.fn().mockReturnThis(),
      upload: jest.fn(),
      remove: jest.fn(),
      getPublicUrl: jest.fn(),
      listBuckets: jest.fn(),
      createBucket: jest.fn(),
    },
  };

  const mockSupabaseService = {
    getClient: jest.fn().mockReturnValue(mockSupabaseClient),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: SupabaseService, useValue: mockSupabaseService },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProfile', () => {
    it('should return profile if it exists', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);

      const result = await service.getProfile('user-uuid');
      expect(result).toEqual(mockProfileRecord);
      expect(mockPrismaService.profile.findUnique).toHaveBeenCalledWith({
        where: { userId: 'user-uuid' },
      });
    });

    it('should throw NotFoundException if profile does not exist', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(null);

      await expect(service.getProfile('user-uuid')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update profile fields and calculate completion', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockPrismaService.profile.update.mockResolvedValue({
        ...mockProfileRecord,
        bio: 'New bio',
        profileCompletion: 90,
      });

      const dto = { bio: 'New bio' };
      const result = await service.updateProfile('user-uuid', dto);

      expect(result.bio).toBe('New bio');
      expect(mockPrismaService.profile.update).toHaveBeenCalled();
    });
  });

  describe('getPreferences', () => {
    it('should return preference fields only', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);

      const result = await service.getPreferences('user-uuid');
      expect(result).toEqual({
        travelStyle: 'Adventure',
        budgetRange: 'Mid-range',
        preferredClimate: 'Temperate',
        favoriteActivities: ['Hiking'],
        preferredTransport: 'Train',
        dietaryPreferences: ['None'],
        accessibilityNeeds: [],
        travelCompanions: 'Solo',
        passportCountry: 'US',
      });
    });
  });

  describe('updatePreferences', () => {
    it('should update travel preferences and calculate completion', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockPrismaService.profile.update.mockResolvedValue({
        ...mockProfileRecord,
        travelStyle: 'Luxury',
      });

      const dto = { travelStyle: 'Luxury' };
      const result = await service.updatePreferences('user-uuid', dto);

      expect(result.travelStyle).toBe('Luxury');
    });
  });

  describe('getOnboarding', () => {
    it('should return onboarding properties', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);

      const result = await service.getOnboarding('user-uuid');
      expect(result).toEqual({
        isOnboarded: false,
        profileCompletion: 80,
      });
    });
  });

  describe('updateOnboarding', () => {
    it('should update isOnboarded flag', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockPrismaService.profile.update.mockResolvedValue({
        ...mockProfileRecord,
        isOnboarded: true,
      });

      const result = await service.updateOnboarding('user-uuid', { isOnboarded: true });
      expect(result.isOnboarded).toBe(true);
    });
  });

  describe('deleteAvatar', () => {
    it('should clear avatarUrl and delete from storage', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockSupabaseClient.storage.remove.mockResolvedValue({ data: {}, error: null });
      mockPrismaService.profile.update.mockResolvedValue({
        ...mockProfileRecord,
        avatarUrl: null,
      });

      await service.deleteAvatar('user-uuid');
      expect(mockSupabaseClient.storage.remove).toHaveBeenCalledWith([
        'user-uuid/avatar-1466967980.jpg',
      ]);
      expect(mockPrismaService.profile.update).toHaveBeenCalledWith({
        where: { userId: 'user-uuid' },
        data: { avatarUrl: null, profileCompletion: expect.any(Number) },
      });
    });

    it('should throw BadRequestException if no avatar exists to delete', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue({
        ...mockProfileRecord,
        avatarUrl: null,
      });

      await expect(service.deleteAvatar('user-uuid')).rejects.toThrow(BadRequestException);
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

    it('should upload image to storage and update database', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockSupabaseClient.storage.listBuckets.mockResolvedValue({
        data: [{ name: 'avatars' }],
        error: null,
      });
      mockSupabaseClient.storage.upload.mockResolvedValue({ data: {}, error: null });
      mockSupabaseClient.storage.getPublicUrl.mockReturnValue({
        data: { publicUrl: 'https://example.com/new-avatar.png' },
      });
      mockPrismaService.profile.update.mockResolvedValue({
        ...mockProfileRecord,
        avatarUrl: 'https://example.com/new-avatar.png',
      });

      const result = await service.uploadAvatar('user-uuid', mockFile);
      expect(result.avatarUrl).toBe('https://example.com/new-avatar.png');
      expect(mockSupabaseClient.storage.upload).toHaveBeenCalled();
      expect(mockPrismaService.profile.update).toHaveBeenCalled();
    });

    it('should throw BadRequestException for invalid mimetype', async () => {
      const badFile = { ...mockFile, mimetype: 'application/pdf' } as Express.Multer.File;
      await expect(service.uploadAvatar('user-uuid', badFile)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for file exceeding limit size', async () => {
      const hugeFile = { ...mockFile, size: 6 * 1024 * 1024 } as Express.Multer.File;
      await expect(service.uploadAvatar('user-uuid', hugeFile)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException if storage upload fails', async () => {
      mockPrismaService.profile.findUnique.mockResolvedValue(mockProfileRecord);
      mockSupabaseClient.storage.listBuckets.mockResolvedValue({
        data: [{ name: 'avatars' }],
        error: null,
      });
      mockSupabaseClient.storage.upload.mockResolvedValue({
        data: null,
        error: { message: 'upload failed' },
      });

      await expect(service.uploadAvatar('user-uuid', mockFile)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
