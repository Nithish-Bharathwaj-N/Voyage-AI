'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { FESTIVALS } from '../dashboard-data';
import { useRouter } from 'next/navigation';

export function UpcomingFestivals() {
  const router = useRouter();

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Upcoming Festivals</h3>
          <p className="text-slate-500">Plan your trips around India&apos;s vibrant celebrations</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FESTIVALS.map((fest, i) => (
          <motion.div
            key={fest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden shrink-0">
              <img 
                src={fest.image} 
                alt={fest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs font-bold flex items-center gap-1 border border-white/30">
                <Calendar className="w-3 h-3" /> {fest.dates}
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h4 className="text-xl font-bold text-slate-900 mb-1">{fest.name}</h4>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                <MapPin className="w-3 h-3" /> {fest.destination}
              </div>
              <p className="text-sm text-slate-600 mb-5 flex-1">{fest.description}</p>
              
              <button 
                onClick={() => router.push(`/planner?q=${encodeURIComponent(fest.name)}`)}
                className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 hover:bg-slate-900 hover:text-white transition-colors group-hover:border-slate-900"
              >
                Plan Itinerary
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
