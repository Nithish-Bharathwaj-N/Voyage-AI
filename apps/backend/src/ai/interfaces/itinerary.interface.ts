export interface Geocoordinates {
  latitude: number;
  longitude: number;
}

/**
 * Represents a nearby place reference (restaurant / attraction) surfaced for each activity.
 */
export interface NearbyPlace {
  name: string;
  category: string;
  walkingMinutes?: number;
  rating?: number;
  priceLevel?: number;
}

/**
 * A single activity / point-of-interest within a day plan.
 * Fields are populated in two passes:
 *   1. LLM generation pass  (time, location, activity, coordinates, reason, etc.)
 *   2. Post-LLM enrichment  (image, rating, googleMapsUrl, openingHours, etc.)
 */
export interface ActivityItem {
  // ── Core fields (LLM generated) ──────────────────────────────────────
  time: string; // "09:00"
  location: string; // Exact place name
  activity: string; // Descriptive activity title
  durationMinutes: number;
  estimatedCost: number;
  currency: string;
  travelTimeMinutes?: number;
  coordinates?: Geocoordinates;
  reason?: string; // Why this fits the traveler
  warnings?: string[];
  category?: string; // "Sightseeing" | "Dining" | "Culture" | "Nature" | "Shopping" | "Nightlife"
  imageQuery?: string; // Search hint for enricher

  // ── LLM intelligence fields ───────────────────────────────────────────
  bestVisitingTime?: string; // "Early morning before 9AM to avoid crowds"
  aiNotes?: string; // Contextual tip from AI consultant
  copilotReasoning?: string;
  alternativeActivity?: string; // "If crowded, visit X instead"
  transportAdvice?: string; // "Take subway Line 3 from city centre"
  admissionNote?: string; // "Book tickets online 48h in advance"
  accessibility?: string; // "Wheelchair accessible" | "Stairs only"
  nearbyRestaurants?: NearbyPlace[];
  nearbyAttractions?: NearbyPlace[];

  // ── Enrichment fields (populated post-LLM via providers) ─────────────
  image?: string;
  imageAttribution?: string;
  rating?: number; // 0-5 from Places API
  reviewCount?: number; // Approximate review count
  openingHours?: string; // "Mon-Sun 09:00-17:00"
  website?: string;
  phone?: string;
  googleMapsUrl?: string;
  bookingUrl?: string;
  priceLevel?: number; // 1-4 ($ to $$$$)
  placeId?: string; // Google Places / OTM ID
}

/**
 * A single day within an itinerary.
 */
export interface DayPlan {
  dayNumber: number;
  date: string; // ISO YYYY-MM-DD
  theme?: string;
  weatherNotes?: string;
  foodSuggestions?: string[];
  activities: ActivityItem[];
  alternativePlan?: string;
  // Intelligence fields
  budgetForDay?: number;
  totalWalkingKm?: number;
  transportSummary?: string;
  morningNote?: string;
  eveningNote?: string;
}

/**
 * Top-level itinerary returned by the planner pipeline.
 */
export interface Itinerary {
  destination: string;
  startDate: string;
  endDate: string;
  budgetLimit: number;
  currency: string;
  totalEstimatedCost: number;
  days: DayPlan[];
  // Enrichment fields (populated post-LLM)
  heroImage?: string;
  heroAttribution?: string;
  country?: string;
  timezone?: string;
  coordinates?: Geocoordinates;
  // Legacy alias kept for compat
  budget?: number;
}
