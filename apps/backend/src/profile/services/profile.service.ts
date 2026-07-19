import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UpdatePreferencesDto } from '../dto/update-preferences.dto';
import { UpdateOnboardingDto } from '../dto/update-onboarding.dto';
import { PreferencesResponseData } from '../dto/preferences-response.dto';
import { OnboardingResponseData } from '../dto/onboarding-response.dto';
import { AvatarUploadResponseData } from '../dto/avatar-upload-response.dto';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  private readonly bucketName = 'avatars';

  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  /**
   * Filter out undefined fields from DTO objects to prevent overwriting db values
   */
  private cleanUndefined(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.entries(obj).reduce(
      (acc, [key, val]) => {
        if (val !== undefined) {
          acc[key] = val;
        }
        return acc;
      },
      {} as Record<string, unknown>,
    );
  }

  /**
   * Helper method to compute profile completion percentage (0-100)
   */
  private calculateCompletion(profile: Record<string, unknown>): number {
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.avatarUrl,
      profile.bio,
      profile.country,
      profile.city,
      profile.language,
      profile.currency,
      profile.timezone,
      profile.travelStyle,
      profile.budgetRange,
      profile.preferredClimate,
      profile.preferredTransport,
      profile.travelCompanions,
      profile.passportCountry,
    ];

    let filledCount = fields.filter((f) => f !== null && f !== undefined && f !== '').length;

    if (Array.isArray(profile.favoriteActivities) && profile.favoriteActivities.length > 0) {
      filledCount++;
    }
    if (Array.isArray(profile.dietaryPreferences) && profile.dietaryPreferences.length > 0) {
      filledCount++;
    }
    if (Array.isArray(profile.accessibilityNeeds) && profile.accessibilityNeeds.length > 0) {
      filledCount++;
    }

    const totalFields = 18;
    return Math.round((filledCount / totalFields) * 100);
  }

  /**
   * Ensure user's profile exists, then execute update and recalculation
   */
  private async getProfileOrThrow(userId: string): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!profile) {
      this.logger.error(`Profile not found for user: ${userId}`);
      throw new NotFoundException('User profile not found');
    }
    return profile;
  }

  /**
   * Retrieve profile context
   */
  async getProfile(userId: string): Promise<Profile> {
    const profile = await this.getProfileOrThrow(userId);
    return profile;
  }

  /**
   * Update personal profile details
   */
  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.getProfileOrThrow(userId);

    // Merge updates to calculate completion safely using plain object conversion
    const merged = {
      ...JSON.parse(JSON.stringify(profile)),
      ...this.cleanUndefined(dto as unknown as Record<string, unknown>),
    };
    const profileCompletion = this.calculateCompletion(merged);

    const updated = await this.prisma.profile.update({
      where: { userId },
      data: {
        ...dto,
        profileCompletion,
      },
    });

    this.logger.log(`Profile Updated for user: ${userId}`);
    return updated;
  }

  /**
   * Retrieve travel preferences
   */
  async getPreferences(userId: string): Promise<PreferencesResponseData> {
    const profile = await this.getProfileOrThrow(userId);
    return {
      travelStyle: profile.travelStyle,
      budgetRange: profile.budgetRange,
      preferredClimate: profile.preferredClimate,
      favoriteActivities: profile.favoriteActivities,
      preferredTransport: profile.preferredTransport,
      dietaryPreferences: profile.dietaryPreferences,
      accessibilityNeeds: profile.accessibilityNeeds,
      travelCompanions: profile.travelCompanions,
      passportCountry: profile.passportCountry,
    };
  }

  /**
   * Update travel preferences
   */
  async updatePreferences(
    userId: string,
    dto: UpdatePreferencesDto,
  ): Promise<PreferencesResponseData> {
    const profile = await this.getProfileOrThrow(userId);

    // Merge updates to calculate completion safely using plain object conversion
    const merged = {
      ...JSON.parse(JSON.stringify(profile)),
      ...this.cleanUndefined(dto as unknown as Record<string, unknown>),
    };
    const profileCompletion = this.calculateCompletion(merged);

    const updated = await this.prisma.profile.update({
      where: { userId },
      data: {
        ...dto,
        profileCompletion,
      },
    });

    this.logger.log(`Preferences Changed for user: ${userId}`);
    return {
      travelStyle: updated.travelStyle,
      budgetRange: updated.budgetRange,
      preferredClimate: updated.preferredClimate,
      favoriteActivities: updated.favoriteActivities,
      preferredTransport: updated.preferredTransport,
      dietaryPreferences: updated.dietaryPreferences,
      accessibilityNeeds: updated.accessibilityNeeds,
      travelCompanions: updated.travelCompanions,
      passportCountry: updated.passportCountry,
    };
  }

  /**
   * Retrieve onboarding status
   */
  async getOnboarding(userId: string): Promise<OnboardingResponseData> {
    const profile = await this.getProfileOrThrow(userId);
    return {
      isOnboarded: profile.isOnboarded,
      profileCompletion: profile.profileCompletion,
    };
  }

  /**
   * Complete onboarding wizard step
   */
  async updateOnboarding(
    userId: string,
    dto: UpdateOnboardingDto,
  ): Promise<OnboardingResponseData> {
    const profile = await this.getProfileOrThrow(userId);

    // Merge updates to calculate completion safely using plain object conversion
    const merged = {
      ...JSON.parse(JSON.stringify(profile)),
      ...this.cleanUndefined(dto as unknown as Record<string, unknown>),
    };
    const profileCompletion = this.calculateCompletion(merged);

    const updated = await this.prisma.profile.update({
      where: { userId },
      data: {
        isOnboarded: dto.isOnboarded,
        profileCompletion,
      },
    });

    if (dto.isOnboarded) {
      this.logger.log(`Onboarding Completed for user: ${userId}`);
    }

    return {
      isOnboarded: updated.isOnboarded,
      profileCompletion: updated.profileCompletion,
    };
  }

  /**
   * Setup bucket utility
   */
  private async ensureBucketExists(supabase: SupabaseClient): Promise<void> {
    try {
      const { data: buckets, error } = await supabase.storage.listBuckets();
      if (error) throw error;
      if (!buckets?.some((b: { name: string }) => b.name === this.bucketName)) {
        const { error: createError } = await supabase.storage.createBucket(this.bucketName, {
          public: true,
        });
        if (createError) throw createError;
      }
    } catch (e: unknown) {
      this.logger.warn(`Supabase bucket ensure utility encountered error: ${(e as Error).message}`);
    }
  }

  /**
   * Upload profile avatar image
   */
  async uploadAvatar(userId: string, file: Express.Multer.File): Promise<AvatarUploadResponseData> {
    const profile = await this.getProfileOrThrow(userId);

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
    }

    // Limit file size (5MB)
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new BadRequestException('File is too large. Maximum allowed size is 5MB.');
    }

    const supabase = this.supabaseService.getClient();
    await this.ensureBucketExists(supabase);

    // Delete old avatar file if present
    if (profile.avatarUrl) {
      try {
        const oldUrl = profile.avatarUrl;
        const searchStr = `${this.bucketName}/`;
        const idx = oldUrl.indexOf(searchStr);
        if (idx !== -1) {
          const oldPath = oldUrl.substring(idx + searchStr.length);
          await supabase.storage.from(this.bucketName).remove([oldPath]);
        }
      } catch (e: unknown) {
        this.logger.warn(`Failed to clean up old avatar file: ${(e as Error).message}`);
      }
    }

    const fileExt = file.originalname.split('.').pop() || 'png';
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(this.bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      this.logger.error(`Avatar upload failed for user: ${userId}. Error: ${uploadError.message}`);
      throw new InternalServerErrorException(`Avatar upload failed: ${uploadError.message}`);
    }

    const { data } = supabase.storage.from(this.bucketName).getPublicUrl(filePath);
    const avatarUrl = data.publicUrl;

    // Update database profile safely using plain object conversion
    const merged = { ...JSON.parse(JSON.stringify(profile)), avatarUrl };
    const profileCompletion = this.calculateCompletion(merged);

    await this.prisma.profile.update({
      where: { userId },
      data: {
        avatarUrl,
        profileCompletion,
      },
    });

    this.logger.log(`Avatar Uploaded for user: ${userId}`);
    return { avatarUrl };
  }

  /**
   * Delete profile avatar image
   */
  async deleteAvatar(userId: string): Promise<Record<string, never>> {
    const profile = await this.getProfileOrThrow(userId);

    if (!profile.avatarUrl) {
      throw new BadRequestException('No avatar to delete');
    }

    const supabase = this.supabaseService.getClient();

    try {
      const oldUrl = profile.avatarUrl;
      const searchStr = `${this.bucketName}/`;
      const idx = oldUrl.indexOf(searchStr);
      if (idx !== -1) {
        const oldPath = oldUrl.substring(idx + searchStr.length);
        await supabase.storage.from(this.bucketName).remove([oldPath]);
      }
    } catch (e: unknown) {
      this.logger.warn(`Failed to delete file from storage: ${(e as Error).message}`);
    }

    // Update database profile safely using plain object conversion
    const merged = { ...JSON.parse(JSON.stringify(profile)), avatarUrl: null };
    const profileCompletion = this.calculateCompletion(merged);

    await this.prisma.profile.update({
      where: { userId },
      data: {
        avatarUrl: null,
        profileCompletion,
      },
    });

    return {};
  }
}
