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
    image: 'https://images.unsplash.com/photo-1572085313466-6710de8d7ba3?auto=format&fit=crop&q=80&w=800',
    description: 'Experience the grandest cultural festival in the City of Joy.',
  },
  {
    id: 'f2',
    name: 'Pushkar Camel Fair',
    destination: 'Pushkar, Rajasthan',
    dates: 'Nov 9 - Nov 15',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
    description: 'A spectacular cultural event with thousands of camels and vibrant bazaars.',
  },
  {
    id: 'f3',
    name: 'Hornbill Festival',
    destination: 'Kohima, Nagaland',
    dates: 'Dec 1 - Dec 10',
    image: 'https://images.unsplash.com/photo-1678536136195-2c8c67a7a3b3?auto=format&fit=crop&q=80&w=800',
    description: 'The Festival of Festivals showcasing Naga heritage.',
  },
  {
    id: 'f4',
    name: 'Rann Utsav',
    destination: 'Kutch, Gujarat',
    dates: 'Nov 1 - Feb 28',
    image: 'https://images.unsplash.com/photo-1616035178330-9b6ff8c5f5dc?auto=format&fit=crop&q=80&w=800',
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
  { id: 'c1', title: 'Weekend Getaways', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600' },
  { id: 'c2', title: 'Luxury Escapes', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600' },
  { id: 'c3', title: 'Hidden Gems', image: 'https://images.unsplash.com/photo-1621682436855-520268574163?auto=format&fit=crop&q=80&w=600' },
  { id: 'c4', title: 'UNESCO Sites', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600' },
  { id: 'c5', title: 'Adventure Trips', image: 'https://images.unsplash.com/photo-1533692328991-08159ff19fca?auto=format&fit=crop&q=80&w=600' },
  { id: 'c6', title: 'Food Trails', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600' },
  { id: 'c7', title: 'Pilgrimage Routes', image: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&q=80&w=600' },
  { id: 'c8', title: 'Romantic Trips', image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80&w=600' },
];

export const SEASONAL_RECOMMENDATIONS = [
  {
    id: 'sr1',
    title: 'Monsoon Escapes',
    subtitle: 'Lush green valleys & waterfalls',
    destinations: '12 Destinations',
    image: 'https://images.unsplash.com/photo-1623194098935-cf220c326ba9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sr2',
    title: 'Summer Hill Stations',
    subtitle: 'Beat the heat in the mountains',
    destinations: '18 Destinations',
    image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'sr3',
    title: 'Winter Snow Destinations',
    subtitle: 'Experience frozen lakes & skiing',
    destinations: '9 Destinations',
    image: 'https://images.unsplash.com/photo-1589136154697-7f938f36c53f?auto=format&fit=crop&q=80&w=800'
  }
];
