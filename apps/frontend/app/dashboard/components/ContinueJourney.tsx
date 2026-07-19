'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTripStore } from '@/store';

export function ContinueJourney() {
  const router = useRouter();
  const allTrips = useTripStore((state) => state.trips);

  // Use global state trips if available, otherwise use default mock for beautiful empty state
  const trips = allTrips.length > 0 ? allTrips.slice(0, 2).map(t => ({
    id: t.id,
    title: t.title,
    status: t.status === 'draft' ? 'Draft Itinerary' : 'Upcoming Departure',
    date: `${t.startDate} - ${t.endDate}`,
    image: t.coverImage || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'
  })) : [
    {
      id: 't1',
      title: 'Kerala Backwaters & Hills',
      status: 'Upcoming Departure',
      date: 'Oct 15 - Oct 22',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 't2',
      title: 'Himachal Road Trip',
      status: 'Draft Itinerary',
      date: 'Planning',
      image: 'https://images.unsplash.com/photo-1605649487212-4d4ce7ca9063?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Continue Your Journey</h3>
        <button 
          onClick={() => router.push('/trips')}
          className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1 group"
        >
          View all trips <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trips.map((trip, i) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative h-64 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            onClick={() => router.push('/planner')}
          >
            <img 
              src={trip.image} 
              alt={trip.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                  {trip.status}
                </span>
                <span className="flex items-center gap-1 text-white/90 text-sm font-medium drop-shadow-md">
                  <Clock className="w-3.5 h-3.5" />
                  {trip.date}
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">{trip.title}</h4>
              
              <div className="overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                <button className="bg-white text-slate-900 px-6 py-2 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                  <Map className="w-4 h-4" /> Continue Planning
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
