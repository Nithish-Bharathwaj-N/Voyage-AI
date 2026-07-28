export type ActivityType = 'flight' | 'hotel' | 'restaurant' | 'activity' | 'transport' | 'note' | 'unknown';

export interface BaseActivity {
  id: string;
  type: ActivityType;
  title: string;
  time: string;
  duration?: string;
  location?: string;
  priority?: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface FlightActivity extends BaseActivity {
  type: 'flight';
  airline: string;
  flightNumber: string;
  terminal?: string;
  gate?: string;
}

export interface HotelActivity extends BaseActivity {
  type: 'hotel';
  checkInTime: string;
  confirmationNumber?: string;
}

export interface RestaurantActivity extends BaseActivity {
  type: 'restaurant';
  cuisine?: string;
  reservationTime?: string;
}

export interface GenericActivity extends BaseActivity {
  type: 'activity' | 'transport' | 'note' | 'unknown';
}

export type PlannerActivity = FlightActivity | HotelActivity | RestaurantActivity | GenericActivity;

export interface TimelineSection {
  id: string;
  title: string; // e.g. "Morning", "Flexible"
  activities: PlannerActivity[];
}

export interface TimelineDay {
  id: string;
  date: string; // ISO string
  title: string; // e.g. "Arrival & Exploration"
  destination: string;
  weather?: { temp: number; condition: string };
  budget?: { spent: number; allocated: number };
  sections: TimelineSection[];
}

export interface Itinerary {
  id: string;
  tripId: string;
  days: TimelineDay[];
}

export const mockItinerary: Itinerary = {
  id: 'itin-1',
  tripId: 't-1',
  days: [
    {
      id: 'd-1',
      date: '2026-10-12',
      title: 'Arrival & Shinjuku',
      destination: 'Tokyo, Japan',
      weather: { temp: 22, condition: 'Sunny' },
      budget: { spent: 450, allocated: 600 },
      sections: [
        {
          id: 'sec-1',
          title: 'Afternoon',
          activities: [
            {
              id: 'act-1',
              type: 'flight',
              title: 'Arrive at Haneda Airport (HND)',
              time: '14:00',
              location: 'Tokyo, Japan',
              airline: 'Japan Airlines',
              flightNumber: 'JL 007',
              terminal: 'Terminal 3',
              priority: 'high'
            } as FlightActivity,
            {
              id: 'act-2',
              type: 'transport',
              title: 'Tokyo Monorail to Hamamatsucho',
              time: '15:15',
              duration: '30m',
              location: 'Haneda Airport'
            }
          ]
        },
        {
          id: 'sec-2',
          title: 'Evening',
          activities: [
            {
              id: 'act-3',
              type: 'hotel',
              title: 'Check-in at Keio Plaza Hotel',
              time: '16:30',
              location: 'Shinjuku City, Tokyo',
              checkInTime: '15:00',
              confirmationNumber: 'KP-99821'
            } as HotelActivity,
            {
              id: 'act-4',
              type: 'restaurant',
              title: 'Dinner at Omoide Yokocho',
              time: '19:00',
              location: 'Shinjuku, Tokyo',
              cuisine: 'Yakitori',
              notes: 'Cash only! Very narrow alleys.'
            } as RestaurantActivity
          ]
        }
      ]
    },
    {
      id: 'd-2',
      date: '2026-10-13',
      title: 'Shibuya & Harajuku',
      destination: 'Tokyo, Japan',
      sections: [
        {
          id: 'sec-3',
          title: 'Morning',
          activities: [
            {
              id: 'act-5',
              type: 'activity',
              title: 'Meiji Jingu Shrine',
              time: '09:00',
              duration: '2h',
              location: 'Shibuya City, Tokyo',
              priority: 'medium'
            },
            {
              id: 'act-6',
              type: 'note',
              title: 'Remember to buy Suica cards if not done yet.',
              time: 'Flexible'
            }
          ]
        }
      ]
    }
  ]
};

export const timelineService = {
  async getItinerary(tripId: string): Promise<Itinerary> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockItinerary;
  }
};
