import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, TravelStats, HistoryEvent, Notification, GlobalFavorites } from './types';

interface UserState {
  profile: UserProfile | null;
  stats: TravelStats;
  history: HistoryEvent[];
  notifications: Notification[];
  favorites: GlobalFavorites;

  // Profile Actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (updates: Partial<UserProfile['preferences']>) => void;

  // Stats Actions
  updateStats: (updates: Partial<TravelStats>) => void;

  // History Actions
  logHistory: (event: HistoryEvent) => void;
  clearHistory: () => void;

  // Notifications Actions
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;

  // Favorites Actions
  toggleFavoriteDestination: (slug: string) => void;
  toggleFavoriteTrip: (id: string) => void;
  toggleFavoriteCollection: (id: string) => void;
  
  // Initialization
  initMockUser: () => void;
}

const DEFAULT_STATS: TravelStats = {
  countriesVisited: 1,
  statesVisited: 8,
  citiesExplored: 24,
  totalTrips: 12,
  totalBudget: 45000,
  longestTripDays: 14,
  favoriteCategory: 'Heritage',
  favoriteState: 'Kerala',
  travelStreak: 4,
};

const DEFAULT_FAVORITES: GlobalFavorites = {
  destinations: ['leh', 'munnar'],
  trips: [],
  collections: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      stats: DEFAULT_STATS,
      history: [],
      notifications: [],
      favorites: DEFAULT_FAVORITES,

      updateProfile: (updates) => set((state) => ({ 
        profile: state.profile ? { ...state.profile, ...updates } : null 
      })),

      updatePreferences: (updates) => set((state) => ({
        profile: state.profile ? { ...state.profile, preferences: { ...state.profile.preferences, ...updates } } : null
      })),

      updateStats: (updates) => set((state) => ({ stats: { ...state.stats, ...updates } })),

      logHistory: (event) => set((state) => ({ 
        history: [event, ...state.history].slice(0, 100) // Keep last 100
      })),
      
      clearHistory: () => set({ history: [] }),

      addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications] })),
      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
      })),

      toggleFavoriteDestination: (slug) => set((state) => {
        const isFav = state.favorites.destinations.includes(slug);
        return {
          favorites: {
            ...state.favorites,
            destinations: isFav 
              ? state.favorites.destinations.filter(d => d !== slug)
              : [...state.favorites.destinations, slug]
          }
        };
      }),
      
      toggleFavoriteTrip: (id) => set((state) => {
        const isFav = state.favorites.trips.includes(id);
        return {
          favorites: {
            ...state.favorites,
            trips: isFav ? state.favorites.trips.filter(t => t !== id) : [...state.favorites.trips, id]
          }
        };
      }),
      
      toggleFavoriteCollection: (id) => set((state) => {
        const isFav = state.favorites.collections.includes(id);
        return {
          favorites: {
            ...state.favorites,
            collections: isFav ? state.favorites.collections.filter(c => c !== id) : [...state.favorites.collections, id]
          }
        };
      }),

      initMockUser: () => {
        if (!get().profile) {
          set({
            profile: {
              id: 'user_1',
              name: 'Nithish',
              email: 'nithish@voyageai.com',
              avatar: '',
              preferences: {
                budgetPreference: 'standard',
                travelStyle: 'couple',
                foodPreference: 'any',
                accommodation: 'hotel'
              },
              badges: ['Early Adopter', 'Himalayan Explorer']
            }
          });
        }
      }
    }),
    {
      name: 'voyage-user-storage',
    }
  )
);
