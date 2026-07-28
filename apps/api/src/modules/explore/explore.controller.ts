import { Controller, Get, Query, Inject, Param } from '@nestjs/common';
import { ExploreService } from './explore.service';

@Controller('explore')
export class ExploreController {
  constructor(@Inject(ExploreService) private readonly exploreService: ExploreService) {}

  @Get('destinations')
  async getDestinations(@Query() query: any) {
    const parseArray = (val: string | string[]) => {
      if (!val) return [];
      if (Array.isArray(val)) return val;
      return val.split(',').map(v => v.trim());
    };

    const filters = {
      query: query.query,
      categories: parseArray(query.categories),
      priceRanges: parseArray(query.priceRanges),
      continents: parseArray(query.continents),
      seasons: parseArray(query.seasons),
      travelStyles: parseArray(query.travelStyles),
      minRating: query.minRating,
      durationWeeks: query.durationWeeks,
      sortBy: query.sortBy,
    };

    return this.exploreService.getDestinations(filters);
  }

  @Get('destinations/:id')
  async getDestinationById(@Param('id') id: string) {
    return this.exploreService.getDestinationById(id);
  }
}
