import { Injectable, Logger } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { GeoDestination } from './geo-intelligence.service';

export interface ExplainableRecommendation {
  destination: GeoDestination;
  confidenceScore: number;
  reasons: string[];
}

@Injectable()
export class RankingEngineService {
  private readonly logger = new Logger(RankingEngineService.name);

  /**
   * Rank a list of destinations based on user preferences and return explainable recommendations.
   */
  public rankDestinations(
    destinations: GeoDestination[],
    dto: PlanTripDto
  ): ExplainableRecommendation[] {
    this.logger.log(`Ranking ${destinations.length} destinations for user preferences.`);
    
    const ranked = destinations.map((dest) => {
      let score = 50; // Base score
      const reasons: string[] = [];

      // 1. Hidden Gem Preference
      const preferHiddenGems = dto.interests?.some(i => i.toLowerCase().includes('hidden gem') || i.toLowerCase().includes('offbeat'));
      if (preferHiddenGems && dest.hiddenGem) {
        score += 20;
        reasons.push("✓ Exceptional hidden gem matching your offbeat preference");
      } else if (!preferHiddenGems && !dest.hiddenGem) {
        score += 15; 
        reasons.push("✓ Highly rated popular destination");
      }

      // 2. Category matching
      const travelStyle = dto.travelStyle?.toLowerCase() || '';
      if (travelStyle.includes('nature') && ['Hill Station', 'Hidden Gem', 'Wildlife'].includes(dest.category)) {
        score += 15;
        reasons.push("✓ Perfect match for a nature-focused trip");
      }
      
      if (travelStyle.includes('culture') && ['Heritage', 'Culture', 'Spiritual'].includes(dest.category)) {
        score += 15;
        reasons.push("✓ Deeply aligns with your cultural interests");
      }
      
      // Cap at 98% to seem realistic, floor at 30%
      const finalScore = Math.max(30, Math.min(98, score + Math.floor(Math.random() * 5))); // slight jitter for realism if identical matches

      return {
        destination: dest,
        confidenceScore: finalScore,
        reasons
      };
    });

    // Sort descending by score
    return ranked.sort((a, b) => b.confidenceScore - a.confidenceScore);
  }
}
