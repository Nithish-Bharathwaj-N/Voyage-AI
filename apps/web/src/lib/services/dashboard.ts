export interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  weather: {
    temp: number;
    condition: string;
  };
  imageUrl: string;
  isUpcoming: boolean;
}

export interface Insight {
  id: string;
  type: 'saving' | 'weather' | 'alert' | 'suggestion';
  message: string;
  actionText?: string;
  actionUrl?: string;
}

export interface Activity {
  id: string;
  tripId: string;
  message: string;
  time: string;
  type: 'created' | 'modified' | 'collaborator';
}

export interface Metric {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export const mockTrips: Trip[] = [
  {
    id: 't-1',
    destination: 'Tokyo',
    country: 'Japan',
    startDate: '2026-10-12',
    endDate: '2026-10-20',
    budget: 4500,
    spent: 1200,
    progress: 85, // Planning progress
    weather: { temp: 22, condition: 'Sunny' },
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop',
    isUpcoming: true
  },
  {
    id: 't-2',
    destination: 'Paris',
    country: 'France',
    startDate: '2026-12-05',
    endDate: '2026-12-10',
    budget: 3000,
    spent: 0,
    progress: 30,
    weather: { temp: 8, condition: 'Cloudy' },
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e90760ce0c4?q=80&w=600&auto=format&fit=crop',
    isUpcoming: true
  }
];

export const mockInsights: Insight[] = [
  {
    id: 'i-1',
    type: 'saving',
    message: 'Your Tokyo trip could save $120 if you shift your flight to Thursday.',
    actionText: 'View Flights'
  },
  {
    id: 'i-2',
    type: 'weather',
    message: 'Rain expected on Day 3 in Tokyo. Consider swapping outdoor activities.',
    actionText: 'Open Planner'
  },
  {
    id: 'i-3',
    type: 'alert',
    message: 'Louvre Museum tickets are selling out fast for your dates in Paris.'
  }
];

export const mockActivities: Activity[] = [
  { id: 'a-1', tripId: 't-1', message: 'Added Shinjuku Gyoen National Garden to Day 2', time: '2 hours ago', type: 'modified' },
  { id: 'a-2', tripId: 't-1', message: 'Budget updated: Flight costs finalized', time: '5 hours ago', type: 'modified' },
  { id: 'a-3', tripId: 't-2', message: 'Created trip: Paris Winter Getaway', time: '1 day ago', type: 'created' }
];

export const mockMetrics: Metric[] = [
  { label: 'Trips Planned', value: '12', trend: '+2 this year', trendUp: true },
  { label: 'Countries Visited', value: '8' },
  { label: 'Saved Places', value: '143', trend: '+12 this month', trendUp: true },
  { label: 'Travel Score', value: '92/100' }
];

// Service functions to simulate API delays
export const dashboardService = {
  async getDashboardData() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      trips: mockTrips,
      insights: mockInsights,
      activities: mockActivities,
      metrics: mockMetrics
    };
  }
};
