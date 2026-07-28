// ============================================================
// Collections Types
// ============================================================

export type CollectionType = 'custom' | 'favorites' | 'wishlist' | 'recently_saved';
export type CollectionPrivacy = 'private' | 'shared' | 'public';
export type SavedItemType = 'destination' | 'trip' | 'hotel' | 'restaurant' | 'activity';

export interface Collection {
  id: string;
  title: string;
  type: CollectionType;
  privacy: CollectionPrivacy;
  coverImageUrl?: string;
  itemCount: number;
  isPinned: boolean;
  isFavorite: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedItemBase {
  id: string;
  collectionId: string;
  type: SavedItemType;
  savedAt: string;
  notes?: string;
}

export interface SavedDestination extends SavedItemBase {
  type: 'destination';
  destinationId: string;
  name: string;
  country: string;
  imageUrl: string;
  rating?: number;
}

export interface SavedTrip extends SavedItemBase {
  type: 'trip';
  tripId: string;
  title: string;
  imageUrl: string;
  dateRange?: string;
}

export interface SavedHotel extends SavedItemBase {
  type: 'hotel';
  hotelId: string;
  name: string;
  location: string;
  imageUrl: string;
  priceLevel: string;
  rating?: number;
}

export interface SavedRestaurant extends SavedItemBase {
  type: 'restaurant';
  restaurantId: string;
  name: string;
  cuisine: string;
  imageUrl: string;
  priceLevel: string;
  rating?: number;
}

export interface SavedActivity extends SavedItemBase {
  type: 'activity';
  activityId: string;
  title: string;
  location: string;
  imageUrl: string;
  duration?: string;
  rating?: number;
}

export type SavedItem = SavedDestination | SavedTrip | SavedHotel | SavedRestaurant | SavedActivity;

export type CollectionSortKey = 'updated' | 'alpha' | 'created';
export type CollectionFilter = {
  search?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
  privacy?: CollectionPrivacy;
};
