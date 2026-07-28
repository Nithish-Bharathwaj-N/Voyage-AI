'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store';
import { 
  Map, Flag, MapPin, Navigation, Wallet, Flame, Compass, 
  Trophy, TrendingUp, Calendar, Award
} from 'lucide-react';

export default function StatisticsPage() {
  const stats = useUserStore((state) => state.stats);

  const statCards = [
    { label: 'Countries Visited', value: stats.countriesVisited, icon: Map, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'States Explored', value: stats.statesVisited, icon: Flag, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Cities Discovered', value: stats.citiesExplored, icon: MapPin, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Trips', value: stats.totalTrips, icon: Navigation, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">My Travel Statistics</h1>
            <p className="text-slate-500">A visual breakdown of your journey across the globe.</p>
          </div>
        </div>

        {/* Top 4 Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center"
            >
              <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-4`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{s.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
              <Wallet className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <h3 className="text-white/80 font-bold uppercase tracking-wider text-sm mb-2">Total Travel Investment</h3>
              <div className="text-5xl font-black mb-4 flex items-center gap-2">
                <span className="text-3xl">₹</span>
                {typeof stats.totalBudget === 'number' ? stats.totalBudget.toLocaleString('en-IN') : '0'}
              </div>
              <p className="text-white/90 max-w-sm">
                By utilizing AI-optimized itineraries, you have effectively managed your travel budget with high efficiency.
              </p>
              
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-white/60 text-xs font-bold uppercase mb-1">Avg Cost / Trip</div>
                  <div className="text-xl font-bold">₹{typeof stats.totalBudget === 'number' && typeof stats.totalTrips === 'number' ? Math.round(stats.totalBudget / Math.max(1, stats.totalTrips)).toLocaleString('en-IN') : '0'}</div>
                </div>
                <div>
                  <div className="text-white/60 text-xs font-bold uppercase mb-1">Longest Duration</div>
                  <div className="text-xl font-bold">{stats.longestTripDays} Days</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute right-0 top-0 opacity-20">
              <Flame className="w-40 h-40" />
            </div>
            <div className="relative z-10">
              <h3 className="text-white/90 font-bold uppercase tracking-wider text-sm mb-2">Travel Streak</h3>
              <div className="text-6xl font-black mb-1">{stats.travelStreak}</div>
              <div className="text-lg font-medium text-white/90">months active</div>
            </div>
            
            <div className="relative z-10 mt-8 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white/90">Favorite Category</span>
                <span className="text-sm font-bold flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md">
                  <Compass className="w-3 h-3"/> {stats.favoriteCategory}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white/90">Most Visited State</span>
                <span className="text-sm font-bold flex items-center gap-1 bg-white/20 px-2 py-1 rounded-md">
                  <Flag className="w-3 h-3"/> {stats.favoriteState}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges / Achievements placeholder */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" />
            Travel Achievements
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-32 text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">Early Adopter</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-32 text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                <Map className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-slate-900">Himalayan Explorer</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 w-32 text-center opacity-50 grayscale">
              <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-slate-500" />
              </div>
              <span className="text-xs font-bold text-slate-900">10k Club</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
