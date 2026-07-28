import { DestinationId, TripId, UserId } from '../primitives';

export interface DomainEvent {
  readonly eventId: string;
  readonly timestamp: Date;
  readonly version: number;
}

export interface TripCreatedEvent extends DomainEvent {
  readonly type: 'TripCreated';
  readonly payload: {
    readonly tripId: TripId;
    readonly ownerId: UserId;
    readonly destinationId: DestinationId;
  };
}

export interface TripDeletedEvent extends DomainEvent {
  readonly type: 'TripDeleted';
  readonly payload: {
    readonly tripId: TripId;
    readonly ownerId: UserId;
  };
}

export interface UserRegisteredEvent extends DomainEvent {
  readonly type: 'UserRegistered';
  readonly payload: {
    readonly userId: UserId;
    readonly email: string;
  };
}

export interface PlaceDataStaleEvent extends DomainEvent {
  readonly type: 'PlaceDataStale';
  readonly payload: {
    readonly placeId: string;
    readonly lastUpdated: Date;
  };
}
