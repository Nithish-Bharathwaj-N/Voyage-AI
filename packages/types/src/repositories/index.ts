import { DestinationId, TripId, UserId } from '../primitives';
import { Destination, Trip } from '../entities';

export interface BaseRepository<T, ID> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: ID, entity: Partial<T>): Promise<T>;
  delete(id: ID): Promise<boolean>;
}

export interface TripRepository extends BaseRepository<Trip, TripId> {
  findByOwner(ownerId: UserId): Promise<Trip[]>;
  findActiveTrips(currentDate: Date): Promise<Trip[]>;
}

export interface DestinationRepository extends BaseRepository<Destination, DestinationId> {
  searchByName(query: string): Promise<Destination[]>;
  findByCountry(country: string): Promise<Destination[]>;
}
