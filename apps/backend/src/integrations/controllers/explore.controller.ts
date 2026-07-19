import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SupabaseAuthGuard } from '../../auth/guards/supabase-auth.guard';
import { PlacesService } from '../services/places.service';
import { GeocodeService } from '../services/geocode.service';

@ApiTags('Explore')
@ApiBearerAuth()
@UseGuards(SupabaseAuthGuard)
@Controller('explore')
export class ExploreController {
  constructor(
    private readonly placesService: PlacesService,
    private readonly geocodeService: GeocodeService,
  ) {}

  @Get('destinations')
  @ApiOperation({ summary: 'Get curated featured destinations' })
  @ApiResponse({ status: 200, description: 'Curated destinations returned' })
  async getFeaturedDestinations(): Promise<Record<string, unknown>[]> {
    const FEATURED_DESTINATIONS = [
      {
        name: 'Tokyo',
        country: 'Japan',
        countryCode: 'JP',
        category: 'Culture',
        lat: 35.6762,
        lng: 139.6503,
        weather: 'Mild',
        season: 'Year-round',
        description: 'An electric blend of ancient temples and futuristic technology.',
        emoji: '🗼',
      },
      {
        name: 'Paris',
        country: 'France',
        countryCode: 'FR',
        category: 'Culture',
        lat: 48.8566,
        lng: 2.3522,
        weather: 'Mild',
        season: 'Apr–Oct',
        description: 'The city of love, world-class cuisine and iconic art.',
        emoji: '🗼',
      },
      {
        name: 'Bali',
        country: 'Indonesia',
        countryCode: 'ID',
        category: 'Beach',
        lat: -8.3405,
        lng: 115.092,
        weather: 'Tropical',
        season: 'May–Sep',
        description: 'Terraced rice fields, volcano hikes, and spiritual temples.',
        emoji: '🌴',
      },
      {
        name: 'New York',
        country: 'USA',
        countryCode: 'US',
        category: 'Adventure',
        lat: 40.7128,
        lng: -74.006,
        weather: 'Varied',
        season: 'Year-round',
        description: 'The city that never sleeps — museums, skyscrapers, and culture.',
        emoji: '🗽',
      },
      {
        name: 'Santorini',
        country: 'Greece',
        countryCode: 'GR',
        category: 'Beach',
        lat: 36.3932,
        lng: 25.4615,
        weather: 'Mediterranean',
        season: 'May–Oct',
        description: 'Iconic blue-domed churches, sunsets, and volcanic beaches.',
        emoji: '🏛️',
      },
      {
        name: 'Kyoto',
        country: 'Japan',
        countryCode: 'JP',
        category: 'Culture',
        lat: 35.0116,
        lng: 135.7681,
        weather: 'Mild',
        season: 'Mar–May, Oct–Nov',
        description: 'Ancient geisha districts, zen gardens, and thousand temples.',
        emoji: '⛩️',
      },
      {
        name: 'Marrakech',
        country: 'Morocco',
        countryCode: 'MA',
        category: 'Foodie',
        lat: 31.6295,
        lng: -7.9811,
        weather: 'Hot',
        season: 'Oct–Apr',
        description: 'A sensory labyrinth of souks, spice markets, and riads.',
        emoji: '🕌',
      },
      {
        name: 'Machu Picchu',
        country: 'Peru',
        countryCode: 'PE',
        category: 'Adventure',
        lat: -13.1631,
        lng: -72.545,
        weather: 'Cool',
        season: 'Apr–Oct',
        description: 'The lost Incan citadel perched high in the Andes mountains.',
        emoji: '🏔️',
      },
      {
        name: 'Maldives',
        country: 'Maldives',
        countryCode: 'MV',
        category: 'Beach',
        lat: 3.2028,
        lng: 73.2207,
        weather: 'Tropical',
        season: 'Nov–Apr',
        description: 'Overwater bungalows, coral reefs, and crystal lagoons.',
        emoji: '🐠',
      },
      {
        name: 'Rome',
        country: 'Italy',
        countryCode: 'IT',
        category: 'Culture',
        lat: 41.9028,
        lng: 12.4964,
        weather: 'Mediterranean',
        season: 'Apr–Jun, Sep–Oct',
        description: 'The eternal city of Colosseum, Vatican, and pizza.',
        emoji: '🏛️',
      },
      {
        name: 'Dubai',
        country: 'UAE',
        countryCode: 'AE',
        category: 'Adventure',
        lat: 25.2048,
        lng: 55.2708,
        weather: 'Hot',
        season: 'Nov–Mar',
        description: 'Futuristic skylines, desert safaris, and luxury at every turn.',
        emoji: '🌆',
      },
      {
        name: 'Goa',
        country: 'India',
        countryCode: 'IN',
        category: 'Beach',
        lat: 15.2993,
        lng: 74.124,
        weather: 'Tropical',
        season: 'Nov–Feb',
        description: 'Golden beaches, Portuguese heritage, and vibrant nightlife.',
        emoji: '🏖️',
      },
    ];
    return FEATURED_DESTINATIONS;
  }

  @Get('search')
  @ApiOperation({ summary: 'Search for destinations by text query' })
  @ApiQuery({ name: 'q', required: true, description: 'Search query' })
  async searchDestinations(@Query('q') query: string): Promise<Record<string, unknown>[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }
    const results = await this.geocodeService.geocode(query.trim());
    return results.map((r) => ({
      name: r.city || r.formattedAddress,
      country: r.country,
      latitude: r.latitude,
      longitude: r.longitude,
      placeId: r.placeId,
      formattedAddress: r.formattedAddress,
    }));
  }
}
