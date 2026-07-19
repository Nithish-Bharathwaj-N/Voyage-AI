'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store';
import { Map, Flag, MapPin, Navigation, Wallet, Flame, Compass } from 'lucide-react';

export function TravelStatistics() {
  const statsFromStore = useUserStore((state) => state.stats);

  const stats = [
    { label: 'Countries', value: statsFromStore.countriesVisited, icon: Map, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'States', value: statsFromStore.statesVisited, icon: Flag, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Cities', value: statsFromStore.citiesExplored, icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Trips', value: statsFromStore.totalTrips, icon: Navigation, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <section>
      <div className="mb-8">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Travel Statistics</h3>
        <p className="text-slate-500">Your journey across India</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="bg-white rounded-3xl p-5 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-3xl p-6 text-white col-span-1 md:col-span-2 shadow-lg relative overflow-hidden"
        >
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Wallet className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-2">Budget Saved</h4>
            <div className="text-4xl font-black mb-4">₹{typeof statsFromStore.totalBudget === 'number' ? statsFromStore.totalBudget.toLocaleString() : '0'}</div>
            <p className="text-white/80 text-sm">By booking through AI-optimized itineraries instead of standard packages.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute right-0 top-0 opacity-20">
            <Flame className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h4 className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Travel Streak</h4>
            <div className="text-5xl font-black mb-1">{statsFromStore.travelStreak} <span className="text-2xl">months</span></div>
          </div>
          <div className="relative z-10 mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
            <span className="text-sm font-semibold">Top Category</span>
            <span className="text-sm font-bold flex items-center gap-1"><Compass className="w-4 h-4"/> {statsFromStore.favoriteCategory}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
