import { Injectable, Logger } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';

@Injectable()
export class SeasonalEngineService {
  private readonly logger = new Logger(SeasonalEngineService.name);

  public getSeasonalInsights(dto: PlanTripDto, staticKnowledge: any): string[] {
    const insights: string[] = [];
    if (!staticKnowledge) return insights;

    const startDate = new Date(dto.startDate);
    const month = startDate.getMonth(); // 0 = Jan, 11 = Dec

    // Simple seasonal logic for Tamil Nadu
    // Summer: March (2) to May (4)
    // Monsoon: June (5) to Sept (8) / Oct (9) to Dec (11) (NE Monsoon)
    // Winter: Dec (11) to Feb (1)

    const isSummer = month >= 2 && month <= 4;
    const isMonsoon = month >= 5 && month <= 10;
    const isWinter = month === 11 || month <= 1;

    if (isSummer) {
      if (staticKnowledge.category === 'Hill Station' || staticKnowledge.elevation > 1000) {
        insights.push("✓ Excellent summer choice (Peak Season). Weather will be pleasant.");
      } else if (staticKnowledge.category === 'Beach') {
        insights.push("⚠️ High summer temperatures expected. Plan outdoor activities before 10 AM or after 4 PM.");
      }
    }

    if (isMonsoon) {
      if (staticKnowledge.category === 'Waterfall') {
        insights.push("✓ Waterfalls will be at their peak flow. Perfect time to visit.");
      } else if (staticKnowledge.category === 'Wildlife') {
        insights.push("⚠️ Verify forest department closures; many sanctuaries close during heavy monsoon.");
      }
    }

    if (isWinter) {
      if (staticKnowledge.category === 'Heritage' || staticKnowledge.category === 'Beach') {
        insights.push("✓ Best season to visit. Ideal weather for exploring architecture and beaches.");
      }
    }

    // Add festival overlaps if implemented in static data
    if (staticKnowledge.festivals && Array.isArray(staticKnowledge.festivals)) {
       for (const festival of staticKnowledge.festivals) {
          if (festival.month && festival.month === month + 1) {
             insights.push(`🎉 Your trip overlaps with the ${festival.name} festival! Expect crowds and vibrant celebrations.`);
          }
       }
    }

    return insights;
  }
}
