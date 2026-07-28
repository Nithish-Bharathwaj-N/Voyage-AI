export interface AccountSettings {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  currency: string;
}

export interface TravelPreferences {
  budget: 'budget' | 'moderate' | 'luxury';
  travelStyle: string[];
  dietary: string[];
  accommodation: string[];
  transportation: string[];
  accessibility: string[];
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: string; // hex
  density: 'comfortable' | 'compact';
  animationsEnabled: boolean;
}

export interface NotificationSettings {
  emailUpdates: boolean;
  pushNotifications: boolean;
  tripReminders: boolean;
  marketingDeals: boolean;
  collaboratorActivity: boolean;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'friends' | 'private';
  analyticsEnabled: boolean;
  locationSharing: boolean;
  searchVisibility: boolean;
}

export interface UnifiedSettings {
  account: AccountSettings;
  preferences: TravelPreferences;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}
