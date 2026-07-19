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
import { DestinationService } from '../services/destination.service';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
  DestinationResponseDto,
  DestinationsResponseDto,
} from '../dto/destination.dto';

@ApiTags('destinations')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller()
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @ApiOperation({ summary: 'Add a destination to a trip' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.CREATED, type: DestinationResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Post('trips/:id/destinations')
  async addDestination(
    @CurrentUser() user: ValidatedUser,
    @Param('id') tripId: string,
    @Body() dto: CreateDestinationDto,
  ): Promise<DestinationResponseDto> {
    const data = await this.destinationService.addDestination(user.id, tripId, dto);
    return {
      success: true,
      message: 'Destination added successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Update destination details' })
  @ApiParam({ name: 'id', type: String, description: 'Destination ID' })
  @ApiResponse({ status: HttpStatus.OK, type: DestinationResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Patch('destinations/:id')
  async updateDestination(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateDestinationDto,
  ): Promise<DestinationResponseDto> {
    const data = await this.destinationService.updateDestination(user.id, id, dto);
    return {
      success: true,
      message: 'Destination updated successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Remove a destination' })
  @ApiParam({ name: 'id', type: String, description: 'Destination ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Destination removed successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Delete('destinations/:id')
  async deleteDestination(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.destinationService.deleteDestination(user.id, id);
    return {
      success: true,
      message: 'Destination removed successfully',
    };
  }

  @ApiOperation({ summary: 'List all destinations associated with a trip' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.OK, type: DestinationsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Get('trips/:id/destinations')
  async getDestinations(
    @CurrentUser() user: ValidatedUser,
    @Param('id') tripId: string,
  ): Promise<DestinationsResponseDto> {
    const data = await this.destinationService.getDestinations(user.id, tripId);
    return {
      success: true,
      message: 'Destinations retrieved successfully',
      data,
    };
  }
}
