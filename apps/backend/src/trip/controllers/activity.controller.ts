import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { ActivityService } from '../services/activity.service';
import {
  CreateActivityDto,
  UpdateActivityDto,
  ActivityResponseDto,
  ActivitiesResponseDto,
} from '../dto/activity.dto';

@ApiTags('activities')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({ summary: 'Add an activity to a destination' })
  @ApiParam({ name: 'id', type: String, description: 'Destination ID' })
  @ApiResponse({ status: HttpStatus.CREATED, type: ActivityResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Post('destinations/:id/activities')
  async addActivity(
    @CurrentUser() user: ValidatedUser,
    @Param('id') destinationId: string,
    @Body() dto: CreateActivityDto,
  ): Promise<ActivityResponseDto> {
    const data = await this.activityService.addActivity(user.id, destinationId, dto);
    return {
      success: true,
      message: 'Activity added successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Update activity details' })
  @ApiParam({ name: 'id', type: String, description: 'Activity ID' })
  @ApiResponse({ status: HttpStatus.OK, type: ActivityResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Patch('activities/:id')
  async updateActivity(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateActivityDto,
  ): Promise<ActivityResponseDto> {
    const data = await this.activityService.updateActivity(user.id, id, dto);
    return {
      success: true,
      message: 'Activity updated successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Remove an activity' })
  @ApiParam({ name: 'id', type: String, description: 'Activity ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Activity removed successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Delete('activities/:id')
  async deleteActivity(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.activityService.deleteActivity(user.id, id);
    return {
      success: true,
      message: 'Activity removed successfully',
    };
  }

  @ApiOperation({ summary: 'List all activities associated with a destination' })
  @ApiParam({ name: 'id', type: String, description: 'Destination ID' })
  @ApiResponse({ status: HttpStatus.OK, type: ActivitiesResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Get('destinations/:id/activities')
  async getActivities(
    @CurrentUser() user: ValidatedUser,
    @Param('id') destinationId: string,
  ): Promise<ActivitiesResponseDto> {
    const data = await this.activityService.getActivities(user.id, destinationId);
    return {
      success: true,
      message: 'Activities retrieved successfully',
      data,
    };
  }
}
