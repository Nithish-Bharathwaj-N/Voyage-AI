import { DestinationId, TripId, UserId } from '../primitives';
import { BudgetCategory, TravelStyle } from '../enums';
import { DateRange } from '../value-objects';
import { Trip } from '../entities';

// ---------------------------------------------------------
// Trip DTOs
// ---------------------------------------------------------

export interface CreateTripDto {
  readonly destinationId: DestinationId;
  readonly title: string;
  readonly dates: DateRange;
  readonly budget: BudgetCategory;
  readonly travelStyle: TravelStyle;
}

export interface UpdateTripDto {
  readonly title?: string;
  readonly dates?: DateRange;
  readonly budget?: BudgetCategory;
  readonly travelStyle?: TravelStyle;
}

export interface TripSummaryDto {
  readonly id: TripId;
  readonly title: string;
  readonly destinationName: string;
  readonly dates: DateRange;
  readonly coverImage?: string;
}

export interface TripDetailDto extends Trip {
  readonly dayPlans: Array<any>; // Expanded DayPlans
}

// ---------------------------------------------------------
// User DTOs
// ---------------------------------------------------------

export interface UpdateProfileDto {
  readonly displayName?: string;
  readonly preferredCurrency?: string;
  readonly defaultTravelStyle?: TravelStyle;
}
