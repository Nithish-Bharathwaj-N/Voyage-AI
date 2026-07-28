import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ExploreService {
  async getDestinations(filters: any) {
    const {
      query,
      categories,
      priceRanges,
      continents,
      seasons,
      travelStyles,
      minRating,
      durationWeeks,
      sortBy,
    } = filters;

    const where: Prisma.DestinationWhereInput = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { city: { contains: query, mode: 'insensitive' } },
        { country: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (categories && categories.length > 0) {
      where.categories = { hasSome: categories };
    }

    if (priceRanges && priceRanges.length > 0) {
      where.priceRange = { in: priceRanges };
    }

    if (continents && continents.length > 0) {
      where.continent = { in: continents };
    }

    if (seasons && seasons.length > 0) {
      where.activeSeasons = { hasSome: seasons };
    }

    if (travelStyles && travelStyles.length > 0) {
      where.travelStyle = { in: travelStyles };
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) };
    }

    if (durationWeeks) {
      where.durationWeeks = { lte: parseInt(durationWeeks, 10) };
    }

    let orderBy: Prisma.DestinationOrderByWithRelationInput = {};
    if (sortBy) {
      switch (sortBy) {
        case 'popular':
          orderBy = { reviewsCount: 'desc' };
          break;
        case 'rating':
          orderBy = { rating: 'desc' };
          break;
        case 'alphabetical':
          orderBy = { name: 'asc' };
          break;
        case 'newest':
          orderBy = { createdAt: 'desc' };
          break;
        case 'budget_low':
          orderBy = { priceRange: 'asc' };
          break;
        case 'value':
          orderBy = { popularityScore: 'desc' };
          break;
        default:
          orderBy = { createdAt: 'desc' };
      }
    } else {
      orderBy = { popularityScore: 'desc' };
    }

    try {
      const results = await prisma.destination.findMany({
        where,
        orderBy,
      });

      // Map to frontend ExploreDestination DTO interface
      return results.map(d => ({
        id: d.id,
        title: d.name,
        country: d.country,
        city: d.city || d.name,
        description: d.description,
        imageUrl: d.imageUrl || d.heroImageUrl,
        rating: d.rating,
        reviewsCount: d.reviewsCount,
        categories: d.categories,
        priceRange: d.priceRange,
        continent: d.continent,
        durationWeeks: d.durationWeeks,
        bestSeason: d.bestSeason,
        travelStyle: d.travelStyle,
        planningScore: d.planningScore,
        isFeatured: d.isFeatured,
        isTrending: d.isTrending,
        isPopular: d.isPopular,
        isHiddenGem: d.isHiddenGem,
        isWeekendEscape: d.isWeekendEscape,
      }));
    } catch (err) {
      console.error('Error fetching destinations:', err);
      throw new InternalServerErrorException('Failed to fetch destinations');
    }
  }

  async getDestinationById(id: string) {
    try {
      const d = await prisma.destination.findUnique({ where: { id } });
      if (!d) return null;
      return {
        id: d.id,
        title: d.name,
        country: d.country,
        city: d.city || d.name,
        description: d.description,
        imageUrl: d.imageUrl || d.heroImageUrl,
        heroImageUrl: d.heroImageUrl || d.imageUrl,
        rating: d.rating,
        reviewsCount: d.reviewsCount,
        categories: d.categories,
        priceRange: d.priceRange,
        continent: d.continent,
        durationWeeks: d.durationWeeks,
        bestSeason: d.bestSeason,
        travelStyle: d.travelStyle,
        planningScore: d.planningScore,
        latitude: d.latitude,
        longitude: d.longitude,
        highlights: [],
        bestTimeToVisit: [],
        currency: 'USD',
        language: 'English',
        timezone: 'UTC',
        visaRequirement: 'Visa on arrival for most',
      };
    } catch (err) {
      console.error('Error fetching destination by id:', err);
      throw new InternalServerErrorException('Failed to fetch destination');
    }
  }
}
