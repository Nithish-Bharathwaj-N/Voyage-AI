export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  coverBannerUrl?: string;
  bio: string;
  location: string;
  memberSince: string;
  travelLevel: string; // e.g. "Globetrotter", "Explorer"
  isVerified: boolean;
}

export interface ProfileStats {
  tripsCompleted: number;
  countriesVisited: number;
  destinationsSaved: number;
  collectionsCreated: number;
  planningStreak: number;
  travelScore: number;
}

export interface TravelPreference {
  id: string;
  category: string; // e.g. "Accommodation", "Dietary", "Pacing"
  values: string[];
}

export interface ActivityTimelineEvent {
  id: string;
  type: 'trip_created' | 'destination_saved' | 'collection_created' | 'achievement_unlocked';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
  link?: string;
}
