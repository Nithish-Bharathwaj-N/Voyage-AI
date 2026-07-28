import { createClient } from '@/lib/supabase/client';
import type { UserProfile, ProfileStats, TravelPreference, ActivityTimelineEvent } from '../types/profile.types';

class ProfileRepository {
  async getProfile(): Promise<UserProfile> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    return {
      id: user.id,
      username: user.email?.split('@')[0] || 'user',
      displayName: user.user_metadata?.name || user.email?.split('@')[0] || 'Traveler',
      avatarUrl: user.user_metadata?.avatar_url || null,
      coverBannerUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop',
      bio: 'New user in VoyageAI.',
      location: 'Earth',
      memberSince: user.created_at || new Date().toISOString(),
      travelLevel: 'Explorer',
      isVerified: true,
    };
  }

  async getProfileStats(): Promise<ProfileStats> {
    return { tripsCompleted: 0, countriesVisited: 0, destinationsSaved: 0, collectionsCreated: 0, planningStreak: 0, travelScore: 0 };
  }

  async getPreferences(): Promise<TravelPreference[]> {
    return [];
  }

  async getActivityTimeline(): Promise<ActivityTimelineEvent[]> {
    return [];
  }
}

export const profileRepository = new ProfileRepository();
