import { Itinerary } from '@/types/itinerary';
import { aiService } from './ai.service';

export interface GenerateItineraryParams {
  destination: string;
  budget: number;
  travelers: number;
  style: string;
  startDate?: string;
  endDate?: string;
}

/**
 * Service managing database and API orchestration for generated itineraries, saves, optimizations, and deletion cycles.
 */
export class PlannerService {
  /**
   * Dispatches generation parameters to the AI pipeline.
   */
  async generateItinerary(params: GenerateItineraryParams): Promise<Itinerary> {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const defaultEnd = new Date(tomorrow);
    defaultEnd.setDate(tomorrow.getDate() + 4);

    const toISODate = (d: Date) => d.toISOString().split('T')[0];

    const startDate = params.startDate || toISODate(tomorrow);
    const endDate = params.endDate || toISODate(defaultEnd);

    return aiService.planTrip({
      destination: params.destination,
      budget: params.budget,
      travelerCount: params.travelers,
      travelStyle: params.style,
      startDate,
      endDate,
    });
  }

  async optimizeItinerary(itinerary: Itinerary, targets: string[]): Promise<Itinerary> {
    return aiService.optimizeTrip({ itinerary, targets });
  }

  /**
   * Commits the active generated itinerary into user trips databases.
   */
  async saveTrip(plan: any, startDate: Date, endDate: Date): Promise<{ id: string }> {
    return aiService.saveToTrip({
      itinerary: plan,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      currency: plan.currency || 'USD',
      estimatedBudget: plan.totalEstimatedCost || 0,
    });
  }
}

export const plannerService = new PlannerService();
