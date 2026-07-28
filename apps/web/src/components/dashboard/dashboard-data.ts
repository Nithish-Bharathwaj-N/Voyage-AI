import { 
  CloudRain, Sun, Wind, Thermometer,
  Plane, AlertTriangle, Train, Calendar,
  TrendingDown, Users, Coins, Sparkles
} from 'lucide-react';

export const FESTIVALS = [
  {
    id: 'f1',
    name: 'Durga Puja',
    destination: 'Kolkata, West Bengal',
    dates: 'Oct 9 - Oct 13',
    image: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the grandest cultural festival in the City of Joy.',
  },
  {
    id: 'f2',
    name: 'Pushkar Camel Fair',
    destination: 'Pushkar, Rajasthan',
    dates: 'Nov 9 - Nov 15',
    image: 'https://images.unsplash.com/photo-1549491689-d1dc5dc1f85f?auto=format&fit=crop&q=80&w=800',
    description: 'A spectacular cultural event with thousands of camels and vibrant bazaars.',
  },
  {
    id: 'f3',
    name: 'Hornbill Festival',
    destination: 'Kohima, Nagaland',
    dates: 'Dec 1 - Dec 10',
    image: 'https://images.unsplash.com/photo-1658428453412-f04bfb0d3d5f?auto=format&fit=crop&q=80&w=800',
    description: 'The Festival of Festivals showcasing Naga heritage.',
  },
  {
    id: 'f4',
    name: 'Rann Utsav',
    destination: 'Kutch, Gujarat',
    dates: 'Nov 1 - Feb 28',
    image: 'https://images.unsplash.com/photo-1588630718501-c5d9969a531e?auto=format&fit=crop&q=80&w=800',
    description: 'A carnival of music and dance in the White Desert.',
  }
];

export const SMART_INSIGHTS = [
  {
    id: 'i1',
    icon: TrendingDown,
    title: 'Cheapest Flights',
    description: 'Flights to Goa are 30% cheaper this weekend from Mumbai.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  {
    id: 'i2',
    icon: CloudRain,
    title: 'Weather Alert',
    description: 'Heavy rainfall expected in Kerala next week. Ideal for Ayurveda retreats.',
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  {
    id: 'i3',
    icon: Users,
    title: 'Crowd Forecast',
    description: 'Shimla is currently at peak capacity. Consider visiting Dalhousie instead.',
    color: 'text-amber-500',
    bg: 'bg-amber-50'
  },
  {
    id: 'i4',
    icon: Sparkles,
    title: 'AI Travel Tip',
    description: 'Book your Diwali travel tickets now to save up to 40% on peak fares.',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50'
  }
];

export const TRAVEL_STATS = {
  countries: 1, // India-first
  states: 8,
  cities: 24,
  trips: 12,
  budgetSaved: '₹45,000',
  distanceTraveled: '12,450 km',
  streak: 4,
  topCategory: 'Heritage'
};

export const LIVE_WEATHER = [
  { city: 'Leh', temp: '12°C', condition: 'Sunny', icon: Sun, aqi: 35 },
  { city: 'Munnar', temp: '18°C', condition: 'Rain', icon: CloudRain, aqi: 22 },
  { city: 'Jaipur', temp: '32°C', condition: 'Clear', icon: Sun, aqi: 85 },
  { city: 'Goa', temp: '28°C', condition: 'Breezy', icon: Wind, aqi: 45 },
];

export const TRAVEL_NEWS = [
  {
    id: 'n1',
    icon: Plane,
    title: 'New Vande Bharat Express',
    description: 'Direct train launched between Delhi and Srinagar.',
    time: '2 hours ago'
  },
  {
    id: 'n2',
    icon: AlertTriangle,
    title: 'Airport Advisory',
    description: 'Expect delays at Mumbai T2 due to runway maintenance.',
    time: '4 hours ago'
  },
  {
    id: 'n3',
    icon: Sparkles,
    title: 'Tourism Festival',
    description: 'Meghalaya Cherry Blossom Festival dates announced.',
    time: '1 day ago'
  }
];

export const COLLECTIONS = [
  { id: 'c1', title: 'Weekend Getaways', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800' },
  { id: 'c2', title: 'Luxury Escapes', image: 'https://images.unsplash.com/photo-1565349472302-36cce75fa98c?auto=format&fit=crop&q=80&w=800' },
  { id: 'c3', title: 'Hidden Gems', image: 'https://images.unsplash.com/photo-1593368297685-618d53086ebc?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', title: 'UNESCO Sites', image: 'https://images.unsplash.com/photo-1564507592208-028f09041235?auto=format&fit=crop&q=80&w=800' },
  { id: 'c5', title: 'Adventure Trips', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800' },
  { id: 'c6', title: 'Food Trails', image: 'https://images.unsplash.com/photo-1621213349942-0f5fc67e9c56?auto=format&fit=crop&q=80&w=800' },
  { id: 'c7', title: 'Pilgrimage Routes', image: 'https://images.unsplash.com/photo-1514222002334-9273c5cfba76?auto=format&fit=crop&q=80&w=800' },
  { id: 'c8', title: 'Romantic Trips', image: 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?auto=format&fit=crop&q=80&w=800' },
];

export const SEASONAL_RECOMMENDATIONS = [
  {
    id: 'sr1',
    title: 'Monsoon Escapes',
    subtitle: 'Lush green valleys & waterfalls',
    destinations: '12 Destinations',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sr2',
    title: 'Summer Hill Stations',
    subtitle: 'Beat the heat in the mountains',
    destinations: '18 Destinations',
    image: 'https://images.unsplash.com/photo-1555546272-ce0543ed9b59?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sr3',
    title: 'Winter Snow Destinations',
    subtitle: 'Experience frozen lakes & skiing',
    destinations: '9 Destinations',
    image: 'https://images.unsplash.com/photo-1612438214708-f428a707dd4e?auto=format&fit=crop&q=80&w=800'
  }
];
