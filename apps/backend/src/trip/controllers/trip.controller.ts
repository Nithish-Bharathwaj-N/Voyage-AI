import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { ValidatedUser } from '../../auth/strategies/supabase.strategy';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { TripResponseDto, TripsResponseDto } from '../dto/trip-response.dto';
import { SendInvitationDto, InvitationResponseDto } from '../dto/invitation.dto';
import { CreateTripFromItineraryDto } from '../dto/from-itinerary.dto';

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiOperation({ summary: 'Create a new trip' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TripResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Post()
  async createTrip(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: CreateTripDto,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.createTrip(user.id, dto);
    return {
      success: true,
      message: 'Trip created successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Retrieve list of trips associated with user' })
  @ApiResponse({ status: HttpStatus.OK, type: TripsResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Get()
  async getTrips(@CurrentUser() user: ValidatedUser): Promise<TripsResponseDto> {
    const data = await this.tripService.getTrips(user.id);
    return {
      success: true,
      message: 'Trips retrieved successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Retrieve all upcoming activities across trips' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @Get('upcoming-activities')
  async getUpcomingActivities(@CurrentUser() user: ValidatedUser) {
    const data = await this.tripService.getUpcomingActivities(user.id);
    return {
      success: true,
      message: 'Upcoming activities retrieved successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Retrieve single trip details' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.OK, type: TripResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Get(':id')
  async getTrip(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.getTrip(user.id, id);
    return {
      success: true,
      message: 'Trip details retrieved successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Update trip details' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.OK, type: TripResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Patch(':id')
  async updateTrip(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateTripDto,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.updateTrip(user.id, id, dto);
    return {
      success: true,
      message: 'Trip updated successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Delete a trip' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Trip deleted successfully' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Delete(':id')
  async deleteTrip(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.tripService.deleteTrip(user.id, id);
    return {
      success: true,
      message: 'Trip deleted successfully',
    };
  }

  @ApiOperation({ summary: 'Archive a trip' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.OK, type: TripResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @HttpCode(HttpStatus.OK)
  @Post(':id/archive')
  async archiveTrip(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.archiveTrip(user.id, id);
    return {
      success: true,
      message: 'Trip archived successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Duplicate an existing trip' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TripResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Post(':id/duplicate')
  async duplicateTrip(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.duplicateTrip(user.id, id);
    return {
      success: true,
      message: 'Trip duplicated successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Send collaboration invitation' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiResponse({ status: HttpStatus.CREATED, type: InvitationResponseDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Post(':id/invite')
  async sendInvitation(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
    @Body() dto: SendInvitationDto,
  ): Promise<InvitationResponseDto> {
    const data = await this.tripService.sendInvitation(user.id, id, dto);
    return {
      success: true,
      message: 'Invitation sent successfully',
      data,
    };
  }

  @ApiOperation({ summary: 'Remove trip collaborator member' })
  @ApiParam({ name: 'id', type: String, description: 'Trip ID' })
  @ApiParam({ name: 'memberId', type: String, description: 'Trip Member ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Member removed successfully' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  @Delete(':id/member/:memberId')
  async removeMember(
    @CurrentUser() user: ValidatedUser,
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ): Promise<{ success: boolean; message: string }> {
    await this.tripService.removeMember(user.id, id, memberId);
    return {
      success: true,
      message: 'Member removed successfully',
    };
  }

  @ApiOperation({ summary: 'Create a trip from an AI-generated itinerary' })
  @ApiResponse({ status: HttpStatus.CREATED, type: TripResponseDto })
  @Post('from-itinerary')
  async createFromItinerary(
    @CurrentUser() user: ValidatedUser,
    @Body() dto: CreateTripFromItineraryDto,
  ): Promise<TripResponseDto> {
    const data = await this.tripService.createFromItinerary(user.id, dto);
    return {
      success: true,
      message: 'Trip created from itinerary successfully',
      data,
    };
  }
}
