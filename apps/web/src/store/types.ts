export type TripStatus = 'draft' | 'upcoming' | 'completed' | 'archived';
export type ReservationType = 'flight' | 'hotel' | 'train' | 'bus' | 'rental' | 'activity' | 'restaurant' | 'event';
export type ReservationStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Reservation {
  id: string;
  tripId: string;
  type: ReservationType;
  title: string;
  provider: string; // e.g. "IndiGo", "Taj Hotels"
  bookingReference: string;
  status: ReservationStatus;
  startDate: string;
  endDate?: string;
  price: number;
  currency: string;
  notes?: string;
}

export interface Trip {
  id: string;
  title: string;
  destinationSlug: string; // Foreign key to Destination
  coverImage: string;
  status: TripStatus;
  startDate: string;
  endDate: string;
  budget: number;
  travelers: number;
  lastEdited: string;
  notes: string;
  tags: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  destinationSlugs: string[]; // List of foreign keys
  isFavorite: boolean;
}

export interface TravelStats {
  countriesVisited: number;
  statesVisited: number;
  citiesExplored: number;
  totalTrips: number;
  totalBudget: number;
  longestTripDays: number;
  favoriteCategory: string;
  favoriteState: string;
  travelStreak: number;
}

export type HistoryActionType = 'viewed' | 'created' | 'updated' | 'deleted' | 'shared' | 'exported';
export type HistoryEntityType = 'destination' | 'trip' | 'reservation' | 'collection' | 'profile';

export interface HistoryEvent {
  id: string;
  action: HistoryActionType;
  entityType: HistoryEntityType;
  entityId: string;
  entityName: string;
  timestamp: string;
}

export interface UserPreferences {
  budgetPreference: 'budget' | 'standard' | 'luxury';
  travelStyle: 'solo' | 'couple' | 'family' | 'group';
  foodPreference: 'veg' | 'non-veg' | 'vegan' | 'any';
  accommodation: 'hotel' | 'hostel' | 'resort' | 'homestay';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: UserPreferences;
  badges: string[];
}

export interface Notification {
  id: string;
  type: 'alert' | 'reminder' | 'update' | 'insight';
  title: string;
  message: string;
  isRead: boolean;
  timestamp: string;
  link?: string;
}

export interface GlobalFavorites {
  destinations: string[]; // slugs
  trips: string[]; // ids
  collections: string[]; // ids
}
