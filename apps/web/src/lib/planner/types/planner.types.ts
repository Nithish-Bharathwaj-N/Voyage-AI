// ============================================================
// Canonical Planner Types
// Single source of truth for all planner data shapes.
// Components must NOT define their own activity/trip types.
// ============================================================

// ─── Activity Variants ───────────────────────────────────────

export type ActivityType =
  | 'flight'
  | 'hotel'
  | 'restaurant'
  | 'activity'
  | 'transport'
  | 'note'
  | 'unknown';

export interface BaseActivity {
  id: string;
  type: ActivityType;
  title: string;
  time: string;
  duration?: string;
  location?: string;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
  completed?: boolean;
  tags?: string[];
  // Geospatial coordinates for map rendering
  coordinates?: { lng: number; lat: number };
}

export interface FlightActivity extends BaseActivity {
  type: 'flight';
  airline: string;
  flightNumber: string;
  terminal?: string;
  gate?: string;
  departureAirport?: string;
  arrivalAirport?: string;
}

export interface HotelActivity extends BaseActivity {
  type: 'hotel';
  checkInTime: string;
  checkOutTime?: string;
  confirmationNumber?: string;
  roomType?: string;
}

export interface RestaurantActivity extends BaseActivity {
  type: 'restaurant';
  cuisine?: string;
  reservationTime?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
}

export interface GenericActivity extends BaseActivity {
  type: 'activity' | 'transport' | 'note' | 'unknown';
}

export type PlannerActivity =
  | FlightActivity
  | HotelActivity
  | RestaurantActivity
  | GenericActivity;

// ─── Itinerary Structure ─────────────────────────────────────

export interface TimelineSection {
  id: string;
  title: string; // "Morning", "Afternoon", "Evening", "Flexible"
  activities: PlannerActivity[];
}

export interface TimelineDay {
  id: string;
  date: string; // ISO 8601
  title: string;
  destination: string;
  weather?: { temp: number; condition: string; icon?: string };
  budget?: { spent: number; allocated: number; currency?: string };
  sections: TimelineSection[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  days: TimelineDay[];
  createdAt?: string;
  updatedAt?: string;
}

// ─── Trip ────────────────────────────────────────────────────

export type TripStatus = 'planning' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface Destination {
  id: string;
  city: string;
  country: string;
  countryCode: string;
  coordinates: { lng: number; lat: number };
  arrivalDate?: string;
  departureDate?: string;
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  status: TripStatus;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  coverImageUrl?: string;
  totalBudget?: number;
  currency?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlannerSummary {
  trip: Trip;
  itinerary: Itinerary;
  totalDays: number;
  totalActivities: number;
  completedActivities: number;
  budgetSpent: number;
  budgetAllocated: number;
}

// ─── Mutation Payloads ────────────────────────────────────────

export interface CreateActivityPayload {
  tripId: string;
  dayId: string;
  sectionId: string;
  type: ActivityType;
  title: string;
  time: string;
  location?: string;
}

export interface MoveActivityPayload {
  tripId: string;
  activityId: string;
  sourceSectionId: string;
  targetSectionId: string;
  targetIndex: number;
}

export interface DeleteActivityPayload {
  tripId: string;
  activityId: string;
  dayId: string;
  sectionId: string;
}

export interface DuplicateActivityPayload {
  tripId: string;
  activityId: string;
  targetDayId?: string;
  targetSectionId?: string;
}

// ─── API Response Shapes ──────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
