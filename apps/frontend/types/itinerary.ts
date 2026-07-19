export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface NearbyPlace {
  name: string;
  category: string;
  walkingMinutes?: number;
  rating?: number;
  priceLevel?: number;
}

export interface CanonicalBudget {
  total: number;
  currency: string;
  accommodation: number;
  transport: number;
  food: number;
  activities: number;
  miscellaneous: number;
}

export interface CanonicalTimelineItem {
  dayNumber: number;
  date?: string;
  theme?: string;
  weatherNotes?: string;
  foodSuggestions?: string[];
  activities: ActivityItem[];
}

export interface PlannerState {
  id?: string;
  trip: {
    destination: string;
    country?: string;
    dates?: string;
    travelers: number;
    budget: number;
    currency: string;
    style: string;
    transport?: string;
  };
  timeline: Array<{
    day: number;
    date?: string;
    theme?: string;
    weatherNotes?: string;
    foodSuggestions?: string[];
    activities: ActivityItem[];
  }>;
  activities: ActivityItem[];
  budget: {
    total: number;
    accommodation: number;
    transport: number;
    food: number;
    activities: number;
    miscellaneous: number;
    currency: string;
  };
  statistics: {
    days: number;
    stops: number;
    distance: number;
    walking: number;
    driving: number;
  };
  weather: any;
  map: any;
  recommendations: string[];
  chatHistory: any[];
  status: 'idle' | 'planning' | 'editing' | 'ready';
  heroImage?: string;
  heroResolvedImage?: string;
  heroAttribution?: string;
  coordinates?: Coordinate;
}

/**
 * A single activity item — mirrors backend ActivityItem interface.
 * Phase 3: Added intelligence + enrichment fields.
 */
export interface ActivityItem {
  // Core (LLM generated)
  id?: string;
  time: string;
  location: string;
  activity: string;
  durationMinutes: number;
  estimatedCost: number;
  currency: string;
  travelTimeMinutes?: number;
  coordinates?: Coordinate;
  reason?: string;
  warnings?: string[];
  category?: string;
  imageQuery?: string;
  resolvedImage?: string;

  // Intelligence fields (LLM generated)
  bestVisitingTime?: string;
  aiNotes?: string;
  copilotReasoning?: string;
  alternativeActivity?: string;
  transportAdvice?: string;
  admissionNote?: string;
  accessibility?: string;
  nearbyRestaurants?: NearbyPlace[];
  nearbyAttractions?: NearbyPlace[];

  // Enrichment fields (populated post-LLM via providers)
  image?: string;
  imageAttribution?: string;
  rating?: number;
  reviewCount?: number;
  openingHours?: string;
  website?: string;
  phone?: string;
  googleMapsUrl?: string;
  bookingUrl?: string;
  priceLevel?: number;
  placeId?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string;
  theme: string;
  weatherNotes?: string;
  foodSuggestions?: string[];
  activities: ActivityItem[];
  alternativePlan?: string;
  budgetForDay?: number;
  totalWalkingKm?: number;
  transportSummary?: string;
  morningNote?: string;
  eveningNote?: string;
}

export interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
  currency: string;
  totalEstimatedCost: number;
  days: DayPlan[];
  // Enrichment fields
  heroImage?: string;
  heroAttribution?: string;
  country?: string;
  timezone?: string;
  coordinates?: Coordinate;
  budget?: number; // legacy alias
}
