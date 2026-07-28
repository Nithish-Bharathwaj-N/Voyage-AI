import { Place } from '@voyageai/db';

export interface RankedPlace {
  place: Place;
  score: number;
  explanation: string[];
}

export interface RankingContext {
  weatherCondition?: string;
  userBudgetLevel?: string;
  timeOfDay?: string; // e.g., 'EVENING'
  targetDistanceKm?: number;
}

export class RankingEngine {
  static rankPlaces(places: Place[], context: RankingContext): RankedPlace[] {
    const ranked = places.map((place) => {
      let score = 50; // Base score out of 100
      const explanation: string[] = [];

      // 1. Rating Modifier (0-30 points)
      if (place.ratingScore) {
        const ratingBonus = (place.ratingScore / 5) * 30;
        score += ratingBonus;
        if (place.ratingScore >= 4.5) explanation.push('Highly rated by users');
      }

      // 2. Popularity Modifier (0-10 points based on count)
      if (place.ratingCount > 1000) {
        score += 10;
        explanation.push('Very popular location');
      } else if (place.ratingCount > 100) {
        score += 5;
      }

      // 3. Weather Context (Penalize or Boost)
      if (context.weatherCondition === 'RAIN') {
        if (place.activityCategories.includes('park') || place.activityCategories.includes('beach')) {
          score -= 40; // Massive penalty for outdoor in rain
          explanation.push('Warning: Outdoor location during rain');
        }
        if (place.activityCategories.includes('museum') || place.type === 'RESTAURANT') {
          score += 15;
          explanation.push('Great indoor option for rainy weather');
        }
      }

      // 4. Budget Context
      if (context.userBudgetLevel && place.budgetCategory) {
        if (context.userBudgetLevel === place.budgetCategory) {
          score += 10;
          explanation.push('Matches your budget preferences');
        } else if (context.userBudgetLevel === 'BUDGET' && place.budgetCategory === 'LUXURY') {
          score -= 20;
          explanation.push('Warning: Expensive');
        }
      }

      // Clamp score between 0 and 100
      score = Math.max(0, Math.min(100, Math.round(score)));

      return { place, score, explanation };
    });

    // Sort descending by score
    return ranked.sort((a, b) => b.score - a.score);
  }
}
