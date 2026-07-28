export type SearchDomain = 
  | 'destinations' 
  | 'cities' 
  | 'countries' 
  | 'activities' 
  | 'hotels' 
  | 'restaurants' 
  | 'flights' 
  | 'trips' 
  | 'collections' 
  | 'users' 
  | 'commands';

export interface SearchResultItem {
  id: string;
  domain: SearchDomain;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  actionUrl?: string; // Route triggers
}

export const mockSearchResults: SearchResultItem[] = [
  // Destinations
  {
    id: 's-dest-1',
    domain: 'destinations',
    title: 'Paris',
    subtitle: 'France',
    description: 'City of light, culture, and premium fashion.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e90760ce0c4?auto=format&fit=crop&w=150&q=80',
    metadata: { rating: 4.8, price: '$$$' },
    actionUrl: '/explore?dest=dest-1',
  },
  {
    id: 's-dest-2',
    domain: 'destinations',
    title: 'Tokyo',
    subtitle: 'Japan',
    description: 'Vibrant city with temples and skyscrapers.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=150&q=80',
    metadata: { rating: 4.9, price: '$$$' },
    actionUrl: '/explore?dest=dest-2',
  },
  // Cities & Countries
  {
    id: 's-city-1',
    domain: 'cities',
    title: 'Kyoto',
    subtitle: 'Honshu, Japan',
    description: 'Imperial capital famous for classical shrines and gardens.',
    actionUrl: '/explore?query=Kyoto',
  },
  {
    id: 's-country-1',
    domain: 'countries',
    title: 'Italy',
    subtitle: 'Europe',
    description: 'Home of the Roman Empire, pasta, wine, and dramatic coasts.',
    actionUrl: '/explore?query=Italy',
  },
  // Activities
  {
    id: 's-act-1',
    domain: 'activities',
    title: 'Louvre Guided Art Tour',
    subtitle: 'Paris, France',
    description: 'Skip the line museum tour highlighting Mona Lisa and Venus de Milo.',
    metadata: { rating: 4.7, cost: '$45/person' },
    actionUrl: '/planner?activity=louvre',
  },
  {
    id: 's-act-2',
    domain: 'activities',
    title: 'Scuba Diving at Coral Reefs',
    subtitle: 'Nusa Penida, Bali',
    description: 'Guided marine life dive with manta rays.',
    metadata: { rating: 4.9, cost: '$80/person' },
    actionUrl: '/planner?activity=scuba',
  },
  // Hotels
  {
    id: 's-hotel-1',
    domain: 'hotels',
    title: 'The Ritz-Carlton',
    subtitle: 'Kyoto, Japan',
    description: 'Luxury riverside hotel with high-end spa services.',
    metadata: { stars: 5, rating: 4.9 },
    actionUrl: '/planner?hotel=ritz',
  },
  {
    id: 's-hotel-2',
    domain: 'hotels',
    title: 'Standard Budget Inn',
    subtitle: 'Rome, Italy',
    description: 'Cozy guestrooms near Termini station.',
    metadata: { stars: 3, rating: 4.2 },
    actionUrl: '/planner?hotel=budget_inn',
  },
  // Restaurants
  {
    id: 's-rest-1',
    domain: 'restaurants',
    title: 'Le Jules Verne',
    subtitle: 'Eiffel Tower, Paris',
    description: 'Fine dining on the second floor of the Eiffel Tower.',
    metadata: { rating: 4.8, price: '$$$$' },
    actionUrl: '/planner?rest=jules_verne',
  },
  // Flights
  {
    id: 's-flight-1',
    domain: 'flights',
    title: 'Flight AF023: NYC to CDG',
    subtitle: 'Air France • Economy/Business',
    description: 'Direct flight departing daily from JFK to Paris Charles de Gaulle.',
    actionUrl: '/planner?flight=af023',
  },
  // Trips
  {
    id: 's-trip-1',
    domain: 'trips',
    title: 'Summer Getaway in Amalfi Coast',
    subtitle: 'Trip Draft • 8 Days',
    description: 'Unwinding on the coastal roads of Italy, visiting Positano and Capri.',
    actionUrl: '/planner?trip=amalfi',
  },
  // Collections
  {
    id: 's-coll-1',
    domain: 'collections',
    title: 'Wanderlust Bucketlist 2026',
    subtitle: '14 places saved',
    description: 'Curated list of must-visit cities and mountain ranges.',
    actionUrl: '/collections?list=bucketlist',
  },
  // Users (Placeholders)
  {
    id: 's-user-1',
    domain: 'users',
    title: 'Sarah Jenkins',
    subtitle: 'Travel Coordinator',
    description: 'Active designer sharing 4 trip planners.',
  },
  // Commands (Quick Actions)
  {
    id: 'cmd-new-trip',
    domain: 'commands',
    title: 'Create New Trip Planner',
    subtitle: 'Action Command',
    description: 'Launches the multi-step trip planning wizard.',
    actionUrl: '/planner?action=new',
  },
  {
    id: 'cmd-wishlist',
    domain: 'commands',
    title: 'View Saved Places & Collections',
    subtitle: 'Navigation Command',
    description: 'Routes directly to your saved listings collection.',
    actionUrl: '/collections',
  },
  {
    id: 'cmd-profile',
    domain: 'commands',
    title: 'Edit User Profile Settings',
    subtitle: 'System Command',
    description: 'Navigate to user preferences and visual themes.',
    actionUrl: '/settings',
  }
];

export const searchService = {
  async search(query: string, domain?: SearchDomain): Promise<SearchResultItem[]> {
    // Delay simulation
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!query.trim()) {
      // Return pinned / default commands if empty query
      return mockSearchResults.filter((item) => item.domain === 'commands');
    }

    const q = query.toLowerCase();
    let results = mockSearchResults.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q))
    );

    if (domain) {
      results = results.filter((item) => item.domain === domain);
    }

    return results;
  },

  async getPinnedSearches(): Promise<SearchResultItem[]> {
    return mockSearchResults.filter(
      (item) => item.id === 'cmd-new-trip' || item.id === 's-dest-2'
    );
  },

  async getPopularSearches(): Promise<string[]> {
    return ['Paris Tour', 'Create Trip', 'Amalfi Coast', 'Tokyo Hotels'];
  }
};
