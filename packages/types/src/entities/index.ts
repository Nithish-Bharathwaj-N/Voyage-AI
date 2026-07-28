import {
  ActivityId,
  CollectionId,
  DestinationId,
  Markdown,
  PlaceId,
  ReservationId,
  ReviewId,
  TripId,
  UserId,
} from '../primitives';
import {
  Address,
  BudgetRange,
  Coordinates,
  DateRange,
  ImageReference,
  OperatingHours,
  Rating,
  WeatherSnapshot,
} from '../value-objects';
import {
  AccommodationType,
  ActivityCategory,
  BudgetCategory,
  ReservationStatus,
  ReviewVisibility,
  TravelStyle,
  TripStatus,
} from '../enums';

// ---------------------------------------------------------
// User & Identity
// ---------------------------------------------------------

export interface User {
  readonly id: UserId;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface Profile {
  readonly id: string;
  readonly userId: UserId;
  readonly displayName: string;
  readonly avatar?: ImageReference;
  readonly preferredCurrency: string;
  readonly defaultTravelStyle: TravelStyle;
}

// ---------------------------------------------------------
// Knowledge Graph Entities
// ---------------------------------------------------------

export interface Destination {
  readonly id: DestinationId;
  readonly name: string;
  readonly country: string;
  readonly coordinates: Coordinates;
  readonly description: Markdown;
  readonly heroImage: ImageReference;
  readonly activeSeasons: string[];
}

export interface Place {
  readonly id: PlaceId;
  readonly destinationId: DestinationId;
  readonly name: string;
  readonly type: 'ATTRACTION' | 'RESTAURANT' | 'HOTEL' | 'TRANSIT';
  readonly coordinates: Coordinates;
  readonly address: Address;
  readonly description: Markdown;
  readonly rating?: Rating;
  readonly images: ImageReference[];
  readonly operatingHours?: OperatingHours;
  readonly isActive: boolean;
}

export interface Attraction extends Place {
  readonly type: 'ATTRACTION';
  readonly activityCategories: ActivityCategory[];
  readonly suggestedDuration?: number; // minutes
}

export interface Restaurant extends Place {
  readonly type: 'RESTAURANT';
  readonly cuisines: string[];
  readonly budgetCategory: BudgetCategory;
}

export interface Hotel extends Place {
  readonly type: 'HOTEL';
  readonly accommodationType: AccommodationType;
  readonly starRating?: number;
}

// ---------------------------------------------------------
// Trips & Planner Entities
// ---------------------------------------------------------

export interface Trip {
  readonly id: TripId;
  readonly ownerId: UserId;
  readonly destinationId: DestinationId;
  readonly title: string;
  readonly dates: DateRange;
  readonly status: TripStatus;
  readonly budget: BudgetCategory;
  readonly travelStyle: TravelStyle;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface DayPlan {
  readonly id: string;
  readonly tripId: TripId;
  readonly date: Date; // Specific day within the Trip.dates
  readonly orderIndex: number;
  readonly notes?: Markdown;
}

export interface Activity {
  readonly id: ActivityId;
  readonly dayPlanId: string;
  readonly placeId?: PlaceId;
  readonly title: string;
  readonly category: ActivityCategory;
  readonly startTime?: string; // HH:mm
  readonly endTime?: string;   // HH:mm
  readonly costEstimate?: BudgetRange;
}

export interface Reservation {
  readonly id: ReservationId;
  readonly tripId: TripId;
  readonly activityId?: ActivityId;
  readonly providerName: string;
  readonly bookingReference: string;
  readonly status: ReservationStatus;
  readonly details: Record<string, any>;
}

// ---------------------------------------------------------
// Social & Collections
// ---------------------------------------------------------

export interface Collection {
  readonly id: CollectionId;
  readonly ownerId: UserId;
  readonly name: string;
  readonly description?: Markdown;
  readonly isPublic: boolean;
}

export interface Review {
  readonly id: ReviewId;
  readonly authorId: UserId;
  readonly placeId: PlaceId;
  readonly rating: number;
  readonly body: Markdown;
  readonly visibility: ReviewVisibility;
  readonly createdAt: Date;
}
