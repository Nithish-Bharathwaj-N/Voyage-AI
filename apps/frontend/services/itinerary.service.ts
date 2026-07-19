import { Itinerary, PlannerState } from '@/types/itinerary';
import { StopCoordinate } from '@/app/planner/types/planner';
import { resolveImageSource } from '@/lib/image-resolver';

/**
 * Service driving itinerary helper computations, converting backend JSON arrays, and plotting Mapbox geo-coordinates.
 */
export class ItineraryService {
  /**
   * Transforms raw API responses into fully validated local itinerary models.
   */
  transformResponse(payload: any): Itinerary {
    // We maintain transformResponse for legacy Itinerary type compatibility,
    // but internally it leverages the same normalization logic if needed.
    const norm = this.normalizePlannerResponse(payload);
    return {
      destination: norm.trip.destination,
      budgetLimit: norm.budget.total,
      totalEstimatedCost: norm.budget.total,
      currency: norm.budget.currency,
      days: norm.timeline as any,
    } as Itinerary;
  }

  validatePlannerResponse(payload: any): PlannerState {
    const defaultState: PlannerState = {
      trip: {
        destination: '',
        travelers: 2,
        budget: 0,
        currency: 'USD',
        style: 'Balanced'
      },
      timeline: [],
      activities: [],
      budget: { total: 0, currency: 'USD', accommodation: 0, transport: 0, food: 0, activities: 0, miscellaneous: 0 },
      statistics: { days: 0, stops: 0, distance: 0, walking: 0, driving: 0 },
      weather: null,
      map: {},
      recommendations: [],
      chatHistory: [],
      status: 'idle'
    };

    if (!payload) {
      console.warn('[validatePlannerResponse] Received empty payload, returning default state.');
      return defaultState;
    }

    // Recover Coordinates
    const defaultCoords = payload.coordinates || payload.itinerary?.coordinates || { latitude: 0, longitude: 0 };

    const rawTimeline = Array.isArray(payload.timeline) ? payload.timeline : (Array.isArray(payload.days) ? payload.days : []);
    let totalWalking = 0;
    let sumActivitiesCost = 0;
    const allActivities: any[] = [];
    
    const timeline = rawTimeline.map((day: any, dIdx: number) => {
      const dayActivities = Array.isArray(day.activities) ? day.activities : (Array.isArray(day.itinerary) ? day.itinerary : []);
      
      const validatedActivities = dayActivities.map((act: any, aIdx: number) => {
        // Error Recovery: Missing coordinates -> Use destination coordinates
        const actCoords = act.coordinates?.latitude ? act.coordinates : defaultCoords;
        // Error Recovery: Missing budget -> estimate 50
        const actCost = Number(act.estimatedCost ?? act.cost ?? 50);
        sumActivitiesCost += actCost;

        const resolvedImage = resolveImageSource(act.image || act.title || act.activity, {
          destination: payload.destination || payload.itinerary?.destination,
          category: act.category || 'Sightseeing'
        });

        const validatedAct = {
          ...act,
          id: act.id || `act-${dIdx}-${aIdx}`,
          activity: act.activity || act.title || 'Planned Activity',
          durationMinutes: Number(act.durationMinutes ?? 60),
          estimatedCost: actCost,
          coordinates: actCoords,
          imageQuery: act.imageQuery || payload.destination || 'Travel',
          resolvedImage,
          warnings: Array.isArray(act.warnings) ? act.warnings : [],
        };
        allActivities.push(validatedAct);
        return validatedAct;
      });
      
      totalWalking += Number(day.totalWalkingKm || 0);

      return {
        day: Number(day.dayNumber || day.day || (dIdx + 1)),
        date: day.date || '',
        theme: day.theme || 'Exploration',
        weatherNotes: day.weatherNotes || '',
        foodSuggestions: Array.isArray(day.foodSuggestions) ? day.foodSuggestions : [],
        activities: validatedActivities
      };
    });

    const travelers = Number(payload.travelers || 2);
    const duration = timeline.length || 1;
    const estimatedTotal = sumActivitiesCost > 0 ? sumActivitiesCost : (50 * duration * travelers);

    // Error Recovery: Missing budget -> Estimate from activities
    const budget = {
      total: Number(payload?.budget?.total ?? payload?.total_cost ?? payload?.totalEstimatedCost ?? estimatedTotal),
      currency: payload?.budget?.currency ?? payload?.currency ?? 'USD',
      accommodation: Number(payload?.budget?.accommodation ?? 0),
      transport: Number(payload?.budget?.transport ?? 0),
      food: Number(payload?.budget?.food ?? 0),
      activities: Number(payload?.budget?.activities ?? sumActivitiesCost),
      miscellaneous: Number(payload?.budget?.miscellaneous ?? 0),
    };

    // Error Recovery: Missing weather -> Hide weather card (set to null)
    const weather = payload.weather?.temp ? payload.weather : null;

    const validatedState: PlannerState = {
      id: payload.id || `plan-${Date.now()}`,
      trip: {
        destination: payload.destination || payload.itinerary?.destination || 'Unknown Destination',
        country: payload.country || payload.itinerary?.country,
        dates: payload.dates,
        travelers,
        budget: budget.total,
        currency: budget.currency,
        style: payload.style || 'Balanced',
        transport: payload.transport
      },
      budget,
      timeline,
      activities: allActivities,
      statistics: {
        days: duration,
        stops: allActivities.length,
        distance: totalWalking, 
        walking: totalWalking,
        driving: 0
      },
      weather,
      map: payload.map || {},
      recommendations: Array.isArray(payload.suggestions) ? payload.suggestions : (Array.isArray(payload.recommendations) ? payload.recommendations : []),
      chatHistory: [],
      status: 'ready',
      heroImage: payload.heroImage || payload.itinerary?.heroImage,
      heroResolvedImage: resolveImageSource(payload.heroImage || payload.itinerary?.heroImage, { destination: payload.destination || payload.itinerary?.destination }),
      heroAttribution: payload.heroAttribution || payload.itinerary?.heroAttribution,
      coordinates: defaultCoords,
    };

    // Logging (Phase 10)
    console.log('[ItineraryService] Raw AI JSON:', payload);
    console.log('[ItineraryService] Normalized AI State:', validatedState);

    return validatedState;
  }

  /**
   * Calculates financial overview and total costs splits.
   */
  calculateCostSummary(itinerary: Itinerary): { total: number; limit: number } {
    return {
      total: itinerary.totalEstimatedCost ?? 0,
      limit: itinerary.budgetLimit ?? 0
    };
  }

  /**
   * Selects coordinates arrays from day plans to construct StopCoordinate markers for Mapbox GL map components.
   */
  extractMapCoordinates(itinerary: Itinerary): StopCoordinate[] {
    const coords: StopCoordinate[] = [];
    if (!itinerary || !itinerary.days) return coords;

    itinerary.days.forEach(day => {
      const activities = day.activities || (day as any).itinerary || [];
      activities.forEach((act: any) => {
        if (act.coordinates?.latitude && act.coordinates?.longitude) {
          coords.push({
            latitude: act.coordinates.latitude,
            longitude: act.coordinates.longitude,
            title: act.activity || act.location || 'Stop',
            category: act.activity?.toLowerCase().includes('restaurant') || act.activity?.toLowerCase().includes('dining') || act.activity?.toLowerCase().includes('food') || act.activity?.toLowerCase().includes('lunch')
              ? 'Dining'
              : act.activity?.toLowerCase().includes('hotel') || act.activity?.toLowerCase().includes('stay') || act.activity?.toLowerCase().includes('accommod')
              ? 'Accommodation'
              : 'Sightseeing',
            dayNumber: day.dayNumber,
            cost: act.estimatedCost || undefined,
          });
        }
      });
    });

    return coords;
  }
}

export const itineraryService = new ItineraryService();
