export interface ExploreDestination {
  id: string;
  title: string;
  country: string;
  city: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  categories: string[];
  priceRange: 'low' | 'medium' | 'high' | 'luxury' | string; 
  continent: 'Europe' | 'Asia' | 'North America' | 'South America' | 'Oceania' | 'Africa' | string;
  durationWeeks: number;
  bestSeason: 'Spring' | 'Summer' | 'Autumn' | 'Winter' | string;
  travelStyle: 'Adventure' | 'Relaxation' | 'Cultural' | 'Family' | 'Romantic' | string;
  planningScore: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  isHiddenGem?: boolean;
  isWeekendEscape?: boolean;
}

export const mockPopularSearches = ['Tokyo', 'Beaches in Europe', 'Hidden Gems', 'Paris Getaway', 'Iceland Adventure'];
export const mockSearchSuggestions = [
  { text: 'Paris, France', category: 'Destination' },
  { text: 'Tokyo, Japan', category: 'Destination' },
  { text: 'Rome, Italy', category: 'Destination' },
  { text: 'Bali, Indonesia', category: 'Destination' },
  { text: 'Reykjavik, Iceland', category: 'Destination' },
  { text: 'Adventure Travels', category: 'Style' },
  { text: 'Gastronomy Getaways', category: 'Category' },
];

export interface ExploreFiltersInput {
  query?: string;
  categories?: string[];
  priceRanges?: string[];
  continents?: string[];
  seasons?: string[];
  travelStyles?: string[];
  minRating?: number;
  durationWeeks?: number;
  sortBy?: 'newest' | 'popular' | 'rating' | 'budget_low' | 'value' | 'alphabetical' | string;
}

export const exploreService = {
  async getDestinations(filters: ExploreFiltersInput = {}): Promise<ExploreDestination[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters.query) params.append('query', filters.query);
      if (filters.minRating) params.append('minRating', filters.minRating.toString());
      if (filters.durationWeeks) params.append('durationWeeks', filters.durationWeeks.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      if (filters.categories?.length) params.append('categories', filters.categories.join(','));
      if (filters.priceRanges?.length) params.append('priceRanges', filters.priceRanges.join(','));
      if (filters.continents?.length) params.append('continents', filters.continents.join(','));
      if (filters.seasons?.length) params.append('seasons', filters.seasons.join(','));
      if (filters.travelStyles?.length) params.append('travelStyles', filters.travelStyles.join(','));

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${apiUrl}/explore/destinations?${params.toString()}`, {
        cache: 'no-store', // Always fetch fresh data from the database
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch destinations: ${response.statusText}`);
      }

      const data = await response.json();
      return data as ExploreDestination[];
    } catch (error) {
      console.error('ExploreService: getDestinations failed', error);
      return [];
    }
  },

  async getSearchSuggestions(query: string) {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    // TODO: In the future, this can also call an API endpoint for autocomplete
    return mockSearchSuggestions.filter((item) =>
      item.text.toLowerCase().includes(q)
    );
  },

  async getPopularSearches() {
    return mockPopularSearches;
  },
};
