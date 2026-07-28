/**
 * Represents a branded primitive type.
 * A branded type ensures that a standard primitive (like a string) cannot be
 * accidentally assigned to another string type representing a different domain concept.
 */
export type Brand<K, T> = K & { readonly __brand: T };

// Identifiers
export type UserId = Brand<string, 'UserId'>;
export type TripId = Brand<string, 'TripId'>;
export type DestinationId = Brand<string, 'DestinationId'>;
export type PlaceId = Brand<string, 'PlaceId'>;
export type HotelId = Brand<string, 'HotelId'>;
export type RestaurantId = Brand<string, 'RestaurantId'>;
export type ActivityId = Brand<string, 'ActivityId'>;
export type ReviewId = Brand<string, 'ReviewId'>;
export type CollectionId = Brand<string, 'CollectionId'>;
export type ReservationId = Brand<string, 'ReservationId'>;
export type KnowledgeNodeId = Brand<string, 'KnowledgeNodeId'>;
export type KnowledgeEdgeId = Brand<string, 'KnowledgeEdgeId'>;

// Geographic
export type Latitude = Brand<number, 'Latitude'>;
export type Longitude = Brand<number, 'Longitude'>;

// Formats
export type CurrencyCode = Brand<string, 'CurrencyCode'>; // ISO 4217
export type Timezone = Brand<string, 'Timezone'>; // IANA Timezone Database
export type Email = Brand<string, 'Email'>;
export type URL = Brand<string, 'URL'>;
export type ImageURL = Brand<string, 'ImageURL'>;
export type Markdown = Brand<string, 'Markdown'>;

// Dates
export type ISODate = Brand<string, 'ISODate'>; // YYYY-MM-DD
export type ISODateTime = Brand<string, 'ISODateTime'>; // ISO 8601 UTC
