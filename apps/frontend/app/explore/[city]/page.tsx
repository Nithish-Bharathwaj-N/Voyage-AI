'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Sparkles, Sun, Star, MapPin, Navigation,
  Hotel, Utensils, Compass, Calendar, Award, User, Quote, Clock
} from 'lucide-react';
import { weatherService } from '@/services/weather.service';
import Link from 'next/link';

interface CityContent {
  name: string;
  country: string;
  climate: string;
  season: string;
  summary: string;
  hotels: { name: string; rating: number; price: string; desc: string }[];
  restaurants: { name: string; rating: number; price: string; specialty: string }[];
  attractions: { name: string; duration: string; fee: string; highlight: string }[];
  reviews: { author: string; rating: number; date: string; comment: string }[];
}

const CITY_DATA: Record<string, CityContent> = {
  Tokyo: {
    name: 'Tokyo',
    country: 'Japan',
    climate: 'Temperate',
    season: 'March–May (Cherry Blossoms) or October–November',
    summary: 'Tokyo is an electric, neon-washed metropolis where centuries-old temple gates stand alongside soaring glass skyscrapers. Renowned for its unparalleled culinary scene, ultra-efficient transit systems, and distinct neighborhoods, it offers a layered experience for every traveler style.',
    hotels: [
      { name: 'Shinjuku Granbell Hotel', rating: 4.6, price: '₹14,500/night', desc: 'Boutique art hotel situated in Cabukicho Shinjuku, boasting a rooftop terrace bar.' },
      { name: 'Aman Tokyo', rating: 4.9, price: '₹75,000/night', desc: 'Six-star luxury urban sanctuary with sweeping views of the Imperial Palace Gardens.' },
      { name: 'Hotel Gracery Shinjuku', rating: 4.4, price: '₹12,800/night', desc: 'Known as the Godzilla hotel, located in the central entertainment quarter.' }
    ],
    restaurants: [
      { name: 'Rokurinsha Ramen', rating: 4.7, price: '₹950 avg', specialty: 'Thick broth Tsukemen dipping ramen, located at Tokyo Station Tokyo Ramen Street.' },
      { name: 'Sushi Dai', rating: 4.8, price: '₹3,500 avg', specialty: 'Fresh morning sushi omakase course near Toyosu Seafood Market.' },
      { name: 'Tempura Kondo', rating: 4.9, price: '₹8,500 avg', specialty: 'Michelin-starred light, crispy vegetable and fish tempura in Ginza.' }
    ],
    attractions: [
      { name: 'Sensō-ji Temple', duration: '2 hours', fee: 'Free', highlight: 'Tokyos oldest and most celebrated Buddhist temple in Asakusa.' },
      { name: 'Shibuya Crossing', duration: '1 hour', fee: 'Free', highlight: 'The iconic multi-directional scramble intersection, best viewed from second floor cafes.' },
      { name: 'teamLab Borderless', duration: '3 hours', fee: '₹3,200', highlight: 'An immersive digital art museum featuring light projections and infinity mirror rooms.' }
    ],
    reviews: [
      { author: 'Elena Rostova', rating: 5, date: 'June 2026', comment: 'Absolutely mind-blowing city. The combination of quiet shrines and busy digital streets is like stepping into the future.' },
      { author: 'Marcus Brody', rating: 4.8, date: 'May 2026', comment: 'Best food experience of my life. Even convenience store snacks were delicious. AI planner routed Shibuya perfectly!' }
    ]
  },
  Paris: {
    name: 'Paris',
    country: 'France',
    climate: 'Mild Maritime',
    season: 'April–June or September–October',
    summary: 'Paris, the City of Light, is a global epicenter of art, fashion, gastronomy, and historic architecture. Cut by the winding Seine River, its wide boulevards and cobblestone quarters inspire romance, intellectual curiosity, and artistic wonder.',
    hotels: [
      { name: 'Hotel Regina Louvre', rating: 4.7, price: '₹28,000/night', desc: 'Elegant traditional French quarters directly overlooking the Tuileries Gardens.' },
      { name: 'Les Piaules Nation', rating: 4.3, price: '₹5,500/night', desc: 'Trendy modern hostel with a beautiful rooftop terrace and local craft beer bar.' }
    ],
    restaurants: [
      { name: 'Le Comptoir du Relais', rating: 4.6, price: '₹3,200 avg', specialty: 'Acclaimed bistro fare in Saint-Germain-des-Prés, run by chef Yves Camdeborde.' },
      { name: 'Chez L&apos;Ami Jean', rating: 4.7, price: '₹6,500 avg', specialty: 'Hearty Basque cuisine and the best rice pudding in Paris.' }
    ],
    attractions: [
      { name: 'Eiffel Tower', duration: '2 hours', fee: '₹2,500', highlight: 'Historic iron spire offering panoramic views of the city skyline.' },
      { name: 'Louvre Museum', duration: '4 hours', fee: '₹1,800', highlight: 'The world largest art museum housing the Mona Lisa and Venus de Milo.' },
      { name: 'Montmartre & Sacré-Cœur', duration: '2.5 hours', fee: 'Free', highlight: 'Historic hilltop arts quarter overlooking central Paris.' }
    ],
    reviews: [
      { author: 'Jean-Pierre', rating: 5, date: 'July 2026', comment: 'Breathtaking architecture at every corner. The Louvre gets crowded, but visiting early morning solved the queues.' }
    ]
  },
  Bali: {
    name: 'Bali',
    country: 'Indonesia',
    climate: 'Tropical',
    season: 'May–September (Dry Season)',
    summary: 'Bali is a tropical paradise defined by its sacred temples, volcanic mountain skylines, terraced green rice paddies, and stunning beaches. Known as the Land of the Gods, it is a haven for spiritual retreats, surf adventures, and vibrant culture.',
    hotels: [
      { name: 'Maya Ubud Resort & Spa', rating: 4.8, price: '₹18,200/night', desc: 'Luxury resort tucked along the Petanu River valley jungle, perfect for wellness retreats.' },
      { name: 'Amnaya Resort Kuta', rating: 4.6, price: '₹6,800/night', desc: 'Boutique resort with rich gardens and local hospitality located near the coast.' }
    ],
    restaurants: [
      { name: 'Naughty Nuri&apos;s Ubud', rating: 4.5, price: '₹950 avg', specialty: 'Legendary flame-grilled sticky pork ribs and shaken martinis.' },
      { name: 'Locavore', rating: 4.9, price: '₹9,800 avg', specialty: 'Innovative ingredient-driven fine dining using 100% local Balinese elements.' }
    ],
    attractions: [
      { name: 'Tegallalang Rice Terraces', duration: '2 hours', fee: '₹250', highlight: 'Beautiful terraced slopes of emerald-green paddy fields in Ubud.' },
      { name: 'Uluwatu Temple Sunset', duration: '2.5 hours', fee: '₹400', highlight: 'Sea temple perched on a cliff edge with traditional Kecak fire dance shows.' }
    ],
    reviews: [
      { author: 'Chandra Wilson', rating: 5, date: 'June 2026', comment: 'An incredibly peaceful place. The spiritual vibes of Ubud combined with coastal sunsets make it unforgettable.' }
    ]
  }
};

const DESTINATION_IMAGES: Record<string, string> = {
  Tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  Paris: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80',
  Bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
  default: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80'
};

export default function CityExplorePage() {
  const params = useParams();
  const router = useRouter();
  const city = (params?.city as string) || 'Tokyo';
  const [activeSubTab, setActiveSubTab] = React.useState<'attractions' | 'hotels' | 'restaurants'>('attractions');

  // Fetch coordinates for live weather
  const lat = city === 'Tokyo' ? 35.6762 : city === 'Paris' ? 48.8566 : -8.3405;
  const lng = city === 'Tokyo' ? 139.6503 : city === 'Paris' ? 2.3522 : 115.0920;

  const { data: weatherRes } = useQuery({
    queryKey: ['weather', lat, lng],
    queryFn: () => weatherService.getCurrentWeather(lat, lng),
  });
  const weather = weatherRes?.data;

  const cityData = CITY_DATA[city] || {
    name: city,
    country: 'Discovery',
    climate: 'Tropical',
    season: 'Year-round',
    summary: `Welcome to ${city}! A curated destination full of local culinary spots, boutique hotel stays, and custom tour stops waiting to be explored.`,
    hotels: [
      { name: 'Central Boutique Stay', rating: 4.5, price: '₹8,500/night', desc: 'Cozy rooms in the heart of town.' }
    ],
    restaurants: [
      { name: 'Local Bistro Cafe', rating: 4.4, price: '₹750 avg', specialty: 'Traditional specialties and local craft selections.' }
    ],
    attractions: [
      { name: 'Historic Main Square', duration: '1.5 hours', fee: 'Free', highlight: 'Historic architectural square showing rich local culture.' }
    ],
    reviews: [
      { author: 'A Traveler', rating: 5, date: 'Recently', comment: 'Had a wonderful time exploring the alleys.' }
    ]
  };

  const img = DESTINATION_IMAGES[city] || DESTINATION_IMAGES.default;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 font-sans text-slate-800">
      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </button>

      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden h-96 shadow-lg">
        <img src={img} alt={cityData.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Discover Hub</span>
            <h1 className="text-4xl md:text-5xl font-black font-display text-white">{cityData.name}</h1>
            <p className="text-sm font-semibold text-slate-350">{cityData.country} · Best in {cityData.season}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/planner?destination=${encodeURIComponent(cityData.name)}`}
              className="flex items-center gap-2 px-5 py-3 bg-blue-650 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan with AI</span>
            </Link>
          </div>
        </div>

        {/* Live Weather Widget */}
        {weather && (
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-white/10 text-white flex items-center gap-3">
            <Sun className="w-4 h-4 text-amber-400" />
            <div className="text-[10px] font-bold">
              <p className="leading-none">{Math.round(weather.temperatureCelsius)}°C</p>
              <p className="text-[8px] opacity-75 capitalize mt-0.5">{weather.conditions?.[0]?.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-violet-600" />
          <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">AI Destination Summary</h3>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {cityData.summary}
        </p>
      </div>

      {/* Content sub-tabs selection */}
      <div className="border-b border-slate-100 pb-3 flex items-center gap-3 text-xs font-bold">
        {[
          { id: 'attractions', label: 'Things to Do', icon: Compass },
          { id: 'hotels', label: 'Places to Stay', icon: Hotel },
          { id: 'restaurants', label: 'Places to Eat', icon: Utensils }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 pb-2 border-b-2 cursor-pointer transition-all ${
                active ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic contents */}
      <div className="space-y-4">
        {activeSubTab === 'attractions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityData.attractions.map((attr) => (
              <div key={attr.name} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2">
                <h4 className="font-bold text-xs text-slate-900">{attr.name}</h4>
                <p className="text-[10px] text-slate-550 leading-relaxed">{attr.highlight}</p>
                <div className="flex justify-between items-center text-[9px] font-bold text-slate-400 border-t border-slate-100 pt-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{attr.duration}</span>
                  <span>Fee: {attr.fee}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'hotels' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityData.hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="font-bold text-xs text-slate-900">{hotel.name}</h4>
                    <span className="flex items-center gap-0.5 text-amber-500 text-[9px] font-black"><Star className="w-2.5 h-2.5 fill-current" />{hotel.rating}</span>
                  </div>
                  <p className="text-[10px] text-slate-550 leading-relaxed mt-1">{hotel.desc}</p>
                </div>
                <div className="text-[10px] font-bold text-blue-600 mt-2 border-t border-slate-100 pt-2 text-right">
                  {hotel.price}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'restaurants' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cityData.restaurants.map((rest) => (
              <div key={rest.name} className="bg-white border border-slate-200 p-5 rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-xs text-slate-900">{rest.name}</h4>
                  <span className="flex items-center gap-0.5 text-amber-500 text-[9px] font-black"><Star className="w-2.5 h-2.5 fill-current" />{rest.rating}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold">Specialty: {rest.specialty}</p>
                <div className="text-[9px] font-bold text-slate-400 border-t border-slate-100 pt-2 text-right">
                  {rest.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guest Reviews */}
      <div className="space-y-4">
        <h3 className="text-sm font-black font-display uppercase tracking-widest text-slate-400">Reviews & Opinions</h3>
        <div className="space-y-3">
          {cityData.reviews.map((rev) => (
            <div key={rev.author} className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px]"><User className="w-3.5 h-3.5" /></div>
                  <span className="text-xs font-bold">{rev.author}</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400">{rev.date}</span>
              </div>
              <p className="text-[10px] text-slate-550 leading-relaxed font-medium italic flex gap-1.5"><Quote className="w-3 h-3 text-blue-500 shrink-0 mt-0.5" />{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
