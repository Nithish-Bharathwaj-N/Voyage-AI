import {
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { ProfileService } from '../services/profile.service';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UserProfileResponseDto } from '../dto/profile-response.dto';
import { UpdatePreferencesDto } from '../dto/update-preferences.dto';
import { PreferencesResponseDto } from '../dto/preferences-response.dto';
import { UpdateOnboardingDto } from '../dto/update-onboarding.dto';
import { OnboardingResponseDto } from '../dto/onboarding-response.dto';
import { AvatarUploadResponseDto } from '../dto/avatar-upload-response.dto';

@ApiTags('Profile')
@ApiBearerAuth('JWT')
@UseGuards(SupabaseAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve logged-in user profile details' })
  @ApiResponse({ status: 200, type: UserProfileResponseDto })
  async getProfile(@CurrentUser() user: ValidatedUser): Promise<UserProfileResponseDto> {
    const data = await this.profileService.getProfile(user.id);
    return {
      success: true,
      message: 'Operation completed successfully',
      data,
    };
  }

  @Patch()
  @ApiOperation({ summary: 'Update personal profile details' })
  @ApiResponse({ status: 200, type: UserProfileResponseDto })
  async updateProfile(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserProfileResponseDto> {
    const data = await this.profileService.updateProfile(user.id, dto);
    return {
      success: true,
      message: 'Profile updated successfully',
      data,
    };
  }

  @Post('avatar')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload profile avatar image' })
  @ApiResponse({ status: 200, type: AvatarUploadResponseDto })
  async uploadAvatar(
    @CurrentUser() user: ValidatedUser,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AvatarUploadResponseDto> {
    if (!file) {
      throw new BadRequestException('File upload is required');
    }
    const data = await this.profileService.uploadAvatar(user.id, file);
    return {
      success: true,
      message: 'Avatar uploaded successfully',
      data,
    };
  }

  @Delete('avatar')
  @ApiOperation({ summary: 'Remove profile avatar image' })
  @ApiResponse({ status: 200, description: 'Avatar deleted successfully' })
  async deleteAvatar(
    @CurrentUser() user: ValidatedUser,
  ): Promise<{ success: boolean; message: string }> {
    await this.profileService.deleteAvatar(user.id);
    return {
      success: true,
      message: 'Avatar removed successfully',
    };
  }

  @Get('preferences')
  @ApiOperation({ summary: 'Retrieve traveler travel & accessibility preferences' })
  @ApiResponse({ status: 200, type: PreferencesResponseDto })
  async getPreferences(@CurrentUser() user: ValidatedUser): Promise<PreferencesResponseDto> {
    const data = await this.profileService.getPreferences(user.id);
    return {
      success: true,
      message: 'Operation completed successfully',
      data,
    };
  }

  @Patch('preferences')
  @ApiOperation({ summary: 'Update traveler travel & accessibility preferences' })
  @ApiResponse({ status: 200, type: PreferencesResponseDto })
  async updatePreferences(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: UpdatePreferencesDto,
  ): Promise<PreferencesResponseDto> {
    const data = await this.profileService.updatePreferences(user.id, dto);
    return {
      success: true,
      message: 'Preferences updated successfully',
      data,
    };
  }

  @Get('onboarding')
  @ApiOperation({ summary: 'Retrieve onboarding wizard step progress status details' })
  @ApiResponse({ status: 200, type: OnboardingResponseDto })
  async getOnboarding(@CurrentUser() user: ValidatedUser): Promise<OnboardingResponseDto> {
    const data = await this.profileService.getOnboarding(user.id);
    return {
      success: true,
      message: 'Operation completed successfully',
      data,
    };
  }

  @Patch('onboarding')
  @ApiOperation({ summary: 'Mark onboarding wizard steps as completed' })
  @ApiResponse({ status: 200, type: OnboardingResponseDto })
  async updateOnboarding(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: UpdateOnboardingDto,
  ): Promise<OnboardingResponseDto> {
    const data = await this.profileService.updateOnboarding(user.id, dto);
    return {
      success: true,
      message: 'Onboarding progress updated successfully',
      data,
    };
  }
}
