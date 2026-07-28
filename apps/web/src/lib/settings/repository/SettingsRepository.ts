import { createClient } from '@/lib/supabase/client';
import type { UnifiedSettings } from '../types/settings.types';

class SettingsRepository {
  async getSettings(): Promise<UnifiedSettings> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const email = user.email || '';
    const name = user.user_metadata?.name || email.split('@')[0] || 'User';

    return {
      account: {
        id: user.id,
        email,
        username: email.split('@')[0] || 'user',
        firstName: name.split(' ')[0] || 'Traveler',
        lastName: name.split(' ').slice(1).join(' ') || '',
        avatarUrl: user.user_metadata?.avatar_url || undefined,
        currency: 'USD',
      },
      preferences: {
        budget: 'moderate',
        travelStyle: ['Balanced'],
        dietary: [],
        accommodation: [],
        transportation: [],
        accessibility: []
      },
      appearance: {
        theme: 'system',
        accentColor: '#000000',
        density: 'comfortable',
        animationsEnabled: true
      },
      notifications: {
        emailUpdates: true,
        pushNotifications: true,
        tripReminders: true,
        marketingDeals: false,
        collaboratorActivity: true
      },
      privacy: {
        profileVisibility: 'public',
        analyticsEnabled: true,
        locationSharing: false,
        searchVisibility: true
      }
    };
  }
}

export const settingsRepository = new SettingsRepository();
