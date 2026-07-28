import { DestinationId, TripId, UserId } from '../primitives';
import { CreateTripDto, TripDetailDto, TripSummaryDto, UpdateTripDto } from '../dto';

export interface TripService {
  createTrip(userId: UserId, dto: CreateTripDto): Promise<TripDetailDto>;
  getTrip(tripId: TripId): Promise<TripDetailDto>;
  getUserTrips(userId: UserId): Promise<TripSummaryDto[]>;
  updateTrip(tripId: TripId, dto: UpdateTripDto): Promise<TripDetailDto>;
  deleteTrip(tripId: TripId): Promise<void>;
}

export interface KnowledgeService {
  resolveDestination(query: string): Promise<DestinationId | null>;
  getPlacesInDestination(destinationId: DestinationId, category?: string): Promise<any[]>;
}

export interface AIService {
  extractIntent(prompt: string): Promise<any>;
  synthesizeItinerary(context: any): Promise<any>;
}
