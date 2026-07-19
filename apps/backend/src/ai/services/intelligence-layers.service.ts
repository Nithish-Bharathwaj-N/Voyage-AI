import { Injectable, Logger } from '@nestjs/common';
import { PlanTripDto } from '../dto/plan-trip.dto';
import { PlaceResult } from '../../integrations/interfaces/place.interface';

@Injectable()
export class IntelligenceLayersService {
  private readonly logger = new Logger(IntelligenceLayersService.name);

  public filterByBudget(
    places: PlaceResult[],
    budgetLevel: string
  ): PlaceResult[] {
    // Assuming simple heuristic: if budget is Low, avoid places with high rating but maybe expensive tags,
    // Since Google Places often has price_level (0-4), we filter if available.
    // For now, we mock filtering for the engine demo.
    this.logger.log(`Filtering ${places.length} places by Budget: ${budgetLevel}`);
    if (budgetLevel.toLowerCase().includes('low')) {
      return places.filter(p => !p.types?.includes('fine_dining'));
    }
    return places;
  }

  public filterBySafety(
    staticKnowledge: any
  ): any {
    // If static knowledge has severe warnings, we can augment the prompt payload
    if (staticKnowledge?.travelWarnings?.length > 0) {
      this.logger.log(`Safety Engine triggered: Found ${staticKnowledge.travelWarnings.length} warnings.`);
      return staticKnowledge.travelWarnings;
    }
    return [];
  }

  public filterByWeather(
    weatherContext: any,
    places: PlaceResult[]
  ): PlaceResult[] {
    // If raining heavily, deprioritize parks
    if (weatherContext?.condition?.toLowerCase().includes('rain')) {
      this.logger.log(`Weather Engine triggered: Rain detected. Deprioritizing outdoor venues.`);
      return places.filter(p => !p.types?.includes('park'));
    }
    return places;
  }
}
