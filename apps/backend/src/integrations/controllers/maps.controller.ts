import { Controller, Get, Post, Body, Query, UseGuards, ParseFloatPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { RoutingService } from '../services/routing.service';
import { GeocodeService } from '../services/geocode.service';
import { DistanceMatrixService } from '../services/distance-matrix.service';
import { MapsIntelligenceService } from '../services/maps-intelligence.service';
import {
  WaypointDto,
  TransportMode,
  RouteDto,
  DistanceMatrixDto,
  GeocodeDto,
} from '../dto/maps.dto';
import { GeoCoordinate } from '../interfaces/maps.interface';

@ApiTags('Maps & Routing')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('maps')
export class MapsController {
  constructor(
    private readonly routingService: RoutingService,
    private readonly geocodeService: GeocodeService,
    private readonly distanceMatrixService: DistanceMatrixService,
    private readonly intelligenceService: MapsIntelligenceService,
  ) {}

  @Post('route')
  @ApiOperation({ summary: 'Calculate multi-stop route for animated drawing' })
  async getRoute(
    @Body('waypoints') waypoints: WaypointDto[],
    @Body('mode') mode: string,
  ): Promise<{ route: RouteDto; intelligence: Record<string, unknown> }> {
    const tMode = Object.values(TransportMode).includes(mode as TransportMode)
      ? (mode as TransportMode)
      : TransportMode.DRIVING;

    const route = await this.routingService.calculateMultiStopRoute(waypoints, tMode);

    return {
      route,
      intelligence: {
        efficiency: this.intelligenceService.estimateTravelEfficiency(route),
        walkingLoad: this.intelligenceService.calculateWalkingLoad(route),
        carbonEmissionGrams: this.intelligenceService.estimateCarbonEmission(route),
        conflicts: this.intelligenceService.detectRouteConflicts([route]),
      },
    };
  }

  @Post('matrix')
  @ApiOperation({ summary: 'Calculate distance matrix for travel time badges' })
  async getDistanceMatrix(
    @Body('origins') origins: WaypointDto[],
    @Body('destinations') destinations: WaypointDto[],
    @Body('mode') mode: string,
  ): Promise<DistanceMatrixDto> {
    const tMode = Object.values(TransportMode).includes(mode as TransportMode)
      ? (mode as TransportMode)
      : TransportMode.DRIVING;

    return this.distanceMatrixService.calculateDistanceMatrix(origins, destinations, tMode);
  }

  @Post('arrival-estimates')
  @ApiOperation({ summary: 'Calculate arrival estimates for day timeline' })
  async getArrivalEstimates(
    @Body('origin') origin: WaypointDto,
    @Body('destinations') destinations: WaypointDto[],
    @Body('departureTime') departureTime: string,
    @Body('mode') mode: string,
  ): Promise<{ estimates: Date[] }> {
    const tMode = Object.values(TransportMode).includes(mode as TransportMode)
      ? (mode as TransportMode)
      : TransportMode.DRIVING;

    const estimates = await this.distanceMatrixService.estimateArrivalTimes(
      origin,
      destinations,
      tMode,
      new Date(departureTime),
    );
    return { estimates };
  }

  @Get('geocode')
  @ApiOperation({ summary: 'Geocode an address' })
  @ApiQuery({ name: 'address', required: true, type: String })
  async geocode(@Query('address') address: string): Promise<GeocodeDto[]> {
    return this.geocodeService.geocode(address);
  }

  @Get('nearby-alternatives')
  @ApiOperation({ summary: 'Find nearby alternatives for route conflicts' })
  @ApiQuery({ name: 'lat', required: true, type: Number })
  @ApiQuery({ name: 'lng', required: true, type: Number })
  async findNearbyAlternatives(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ): Promise<GeoCoordinate[]> {
    return this.intelligenceService.findNearbyAlternatives({ latitude: lat, longitude: lng });
  }
}
