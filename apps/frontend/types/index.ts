export type TripStatus = 'PLANNING' | 'ONGOING' | 'COMPLETED';
export type TripVisibility = 'PRIVATE' | 'PUBLIC' | 'SHARED';
export type CollaboratorRole = 'OWNER' | 'EDITOR' | 'VIEWER';
export type InvitationStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export interface Trip {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  coverImage?: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  visibility: TripVisibility;
  currency: string;
  estimatedBudget?: number;
  actualBudget?: number;
  country?: string;
  city?: string;
  timezone: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  collaborators?: Array<{ id: string; email: string; role: string }>;
  aiGenerated?: boolean;
}

export interface Destination {
  id: string;
  tripId: string;
  name: string;
  latitude?: number;
  longitude?: number;
  country?: string;
  city?: string;
  arrivalDate?: string;
  departureDate?: string;
  notes?: string;
  order: number;
}

export interface Activity {
  id: string;
  tripId: string;
  destinationId: string;
  name: string;
  description?: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  startTime?: string;
  endTime?: string;
  cost?: number;
  notes?: string;
  order: number;
  location?: string;
  estimatedCost?: number;
  duration?: string;
  type?: string;
}

export interface CreateTripDto {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  visibility?: TripVisibility;
  currency?: string;
  estimatedBudget?: number;
  country?: string;
  city?: string;
  timezone?: string;
}

export interface UpdateTripDto {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: TripStatus;
  visibility?: TripVisibility;
  estimatedBudget?: number;
  isArchived?: boolean;
}
