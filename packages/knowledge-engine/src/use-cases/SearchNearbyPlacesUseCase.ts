import { PlaceRepository, Place } from '@voyageai/db';
import { IPlaceProvider } from '../adapters/GooglePlacesAdapter';
import { RankingEngine, RankedPlace, RankingContext } from '../ranking/RankingEngine';
import { RedisCacheManager } from '../cache/RedisCacheManager';

export class SearchNearbyPlacesUseCase {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly placeProvider: IPlaceProvider,
    private readonly cacheManager: RedisCacheManager
  ) {}

  async execute(
    lat: number, 
    lng: number, 
    radiusKm: number, 
    category: string,
    destinationId: string,
    context: RankingContext
  ): Promise<RankedPlace[]> {
    // 1. Generate Cache Key based on Geohash / coordinates
    // Simplified key for demonstration
    const cacheKey = `ke:nearby:${Math.round(lat*100)},${Math.round(lng*100)}:${radiusKm}:${category}`;
    
    let places: Place[] | null = await this.cacheManager.get<Place[]>(cacheKey);

    if (!places) {
      // 2. Cache miss. Query local PostGIS DB first.
      places = await this.placeRepository.findNearbyPlaces(lat, lng, radiusKm, category);

      // 3. If DB is sparse (e.g., < 5 results), fallback to External Provider (Google)
      if (places.length < 5) {
        console.log('[KnowledgeEngine] PostGIS DB sparse, fetching from Provider Adapter...');
        const providerPlaces = await this.placeProvider.searchNearby(lat, lng, radiusKm * 1000, category, destinationId);
        
        // 4. Save new normalized places to DB to enrich our Knowledge Graph
        for (const p of providerPlaces) {
          // Check if exists
          const exists = await this.placeRepository.findById(p.id);
          if (!exists) {
            await this.placeRepository.create(p);
          }
        }
        
        // Merge the lists (in reality, deduplicate by distance/name)
        places = [...places, ...providerPlaces];
      }

      // 5. Cache the raw result for 24 hours
      await this.cacheManager.set(cacheKey, places, 60 * 60 * 24);
    }

    // 6. Pass through the deterministic Ranking Engine
    return RankingEngine.rankPlaces(places, context);
  }
}
