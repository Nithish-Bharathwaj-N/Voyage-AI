// ============================================================
// Destination Types
// Single source of truth for global Destination entities.
// ============================================================

export interface DestinationImage {
  id: string;
  url: string;
  caption?: string;
}

export interface DestinationAttraction {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  rating?: number;
  category: string;
}

export interface DestinationHotel {
  id: string;
  name: string;
  rating?: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  imageUrl?: string;
  description?: string;
}

export interface DestinationRestaurant {
  id: string;
  name: string;
  cuisine: string;
  rating?: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  imageUrl?: string;
}

export interface DetailedDestination {
  id: string;
  city: string;
  country: string;
  coverImageUrl: string;
  rating: number;
  reviewCount: number;
  bestSeason: string;
  
  overview: {
    description: string;
    travelSummary: string;
  };
  
  budget: {
    estimatePerDay: number;
    currency: string;
    label: string;
  };
  
  safety: {
    score: number; // 0-100
    label: string;
    tips: string[];
  };
  
  practicalInfo: {
    currency: string;
    language: string;
    timezone: string;
    visaRequired: boolean | null; // null if unknown/depends on user nationality
  };
  
  weather: {
    current: { tempC: number; condition: string; icon: string };
    averageHigh: number;
    averageLow: number;
  };
  
  gallery: DestinationImage[];
  attractions: DestinationAttraction[];
  hotels: DestinationHotel[];
  restaurants: DestinationRestaurant[];
  
  transportation: {
    methods: { type: string; description: string; icon: string }[];
    tip: string;
  };
  
  tips: {
    general: string[];
    packing: string[];
    emergency: { label: string; number: string }[];
  };
  
  relatedDestinations: { id: string; name: string; imageUrl: string }[];
}
