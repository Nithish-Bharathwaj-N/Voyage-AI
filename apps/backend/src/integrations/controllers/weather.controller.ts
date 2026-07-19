import { Controller, Get, Query, UseGuards, ParseFloatPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { WeatherService } from '../services/weather.service';
import { WeatherIntelligenceDto } from '../dto/weather.dto';

@ApiTags('Weather')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('intelligence')
  @ApiOperation({ summary: 'Get full weather intelligence for coordinates (Planner API)' })
  @ApiQuery({ name: 'lat', required: true, type: Number })
  @ApiQuery({ name: 'lng', required: true, type: Number })
  @ApiQuery({ name: 'days', required: false, type: Number })
  async getIntelligence(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('days') days?: string,
  ): Promise<{
    data: WeatherIntelligenceDto;
    ai: {
      bestTravelTimes: string[];
      indoorRecommended: boolean;
      outdoorRecommended: boolean;
      riskLevel: string;
      extremeConditions: string[];
      photographyTimes: string[];
    };
  }> {
    const parsedDays = days ? parseInt(days, 10) : 7;
    const weather = await this.weatherService.getWeatherIntelligence(lat, lng, parsedDays);

    return {
      data: weather,
      ai: {
        bestTravelTimes: this.weatherService.recommendBestTravelTime(weather),
        indoorRecommended: this.weatherService.recommendIndoorActivities(weather),
        outdoorRecommended: this.weatherService.recommendOutdoorActivities(weather),
        riskLevel: this.weatherService.calculateWeatherRisk(weather),
        extremeConditions: this.weatherService.detectExtremeConditions(weather),
        photographyTimes: this.weatherService.estimatePhotographyConditions(weather),
      },
    };
  }
}
