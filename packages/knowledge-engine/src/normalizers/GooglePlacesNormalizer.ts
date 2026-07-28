import { Place } from '@voyageai/db';
import { v4 as uuidv4 } from 'uuid';

export class GooglePlacesNormalizer {
  static normalize(googlePlace: any, destinationId: string): Place {
    const types = googlePlace.types || [];
    
    // Simplistic category mapping
    let category = 'ATTRACTION';
    if (types.includes('restaurant') || types.includes('cafe')) {
      category = 'RESTAURANT';
    } else if (types.includes('lodging') || types.includes('hotel')) {
      category = 'HOTEL';
    }

    return {
      id: uuidv4(), // We assign an internal ID. We might want to store google's place_id as a reference.
      destinationId,
      name: googlePlace.name,
      type: category,
      latitude: googlePlace.geometry?.location?.lat || 0,
      longitude: googlePlace.geometry?.location?.lng || 0,
      addressJson: { formatted_address: googlePlace.formatted_address },
      description: googlePlace.editorial_summary?.overview || '',
      images: googlePlace.photos ? googlePlace.photos.map((p: any) => ({ reference: p.photo_reference })) : [],
      ratingScore: googlePlace.rating || null,
      ratingCount: googlePlace.user_ratings_total || 0,
      activityCategories: types,
      cuisines: [], // Google Places requires a separate details call for explicit cuisines sometimes
      budgetCategory: googlePlace.price_level ? this.mapPriceLevel(googlePlace.price_level) : null,
      accommodationType: category === 'HOTEL' ? 'HOTEL' : null,
    };
  }

  private static mapPriceLevel(level: number): string {
    switch (level) {
      case 1: return 'BUDGET';
      case 2: return 'MODERATE';
      case 3: return 'LUXURY';
      case 4: return 'ULTRA_LUXURY';
      default: return 'MODERATE';
    }
  }
}
