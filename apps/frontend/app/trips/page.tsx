'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripStore, useUserStore, Trip, TripStatus } from '@/store';
import { 
  Search, Plus, MapPin, Calendar, Clock, Trash2, Copy, Edit2, Share2, 
  Download, Filter, ChevronRight, Plane, Archive, CheckCircle2, Pencil
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const STATUS_ICONS = {
  draft: Pencil,
  upcoming: Plane,
  completed: CheckCircle2,
  archived: Archive
};

const STATUS_COLORS = {
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
  upcoming: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  archived: 'bg-slate-100 text-slate-700 border-slate-200'
};

export default function TripsPage() {
  const router = useRouter();
  const { trips, deleteTrip, duplicateTrip, updateTrip } = useTripStore();
  const [activeTab, setActiveTab] = useState<TripStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize mock trip if empty (for demo purposes)
  React.useEffect(() => {
    if (trips.length === 0) {
      useTripStore.getState().addTrip({
        id: 't1',
        title: 'Kerala Backwaters & Hills',
        destinationSlug: 'munnar',
        coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
        status: 'upcoming',
        startDate: '2024-10-15',
        endDate: '2024-10-22',
        budget: 45000,
        travelers: 2,
        lastEdited: new Date().toISOString(),
        notes: 'Honeymoon trip',
        tags: ['romantic', 'nature']
      });
      useTripStore.getState().addTrip({
        id: 't2',
        title: 'Golden Triangle Exploration',
        destinationSlug: 'jaipur',
        coverImage: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=800',
        status: 'draft',
        startDate: '2025-01-10',
        endDate: '2025-01-18',
        budget: 30000,
        travelers: 4,
        lastEdited: new Date().toISOString(),
        notes: 'Family trip',
        tags: ['heritage', 'culture']
      });
    }
  }, [trips.length]);

  const filteredTrips = useMemo(() => {
    return trips.filter(t => {
      const matchesTab = activeTab === 'all' || t.status === activeTab;
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (t.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesSearch;
    }).sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
  }, [trips, activeTab, searchQuery]);

  const handleExportPDF = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    toast.success(`Generating PDF for ${title}...`);
    useUserStore.getState().logHistory({
      id: `hist_${Date.now()}`, action: 'exported', entityType: 'trip', 
      entityId: title, entityName: title, timestamp: new Date().toISOString()
    });
  };

  const handleShare = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    toast.success(`Share link copied for ${title}!`);
    useUserStore.getState().logHistory({
      id: `hist_${Date.now()}`, action: 'shared', entityType: 'trip', 
      entityId: title, entityName: title, timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Saved Trips</h1>
            <p className="text-slate-500">Manage your itineraries, bookings, and travel memories.</p>
          </div>
          <button 
            onClick={() => router.push('/explore')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Plan New Trip
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex bg-slate-100 p-1 rounded-full w-full md:w-auto overflow-x-auto hide-scrollbar">
            {['all', 'draft', 'upcoming', 'completed', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search trips or tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredTrips.map(trip => {
              const StatusIcon = STATUS_ICONS[trip.status];
              return (
                <motion.div
                  key={trip.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => toast.info(`Opening details for ${trip.title}`)}
                >
                  {/* Card Header Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    <img 
                      src={trip.coverImage} 
                      alt={trip.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${STATUS_COLORS[trip.status]}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="capitalize">{trip.status}</span>
                      </span>
                    </div>

                    {/* Quick Actions (Hover) */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <button onClick={(e) => { e.stopPropagation(); duplicateTrip(trip.id); toast.success('Trip duplicated!'); }} className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-sm" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => handleShare(e, trip.title)} className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-sm" title="Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => handleExportPDF(e, trip.title)} className="p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-sm" title="Export PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); deleteTrip(trip.id); toast.success('Trip deleted'); }} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full shadow-sm" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-indigo-600 transition-colors">{trip.title}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {new Date(trip.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - {new Date(trip.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {trip.travelers} Travelers • ₹{typeof trip.budget === 'number' ? trip.budget.toLocaleString('en-IN') : '0'}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold capitalize border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
                      <span>Edited {new Date(trip.lastEdited).toLocaleDateString()}</span>
                      <span className="flex items-center gap-1 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <Plane className="w-10 h-10 text-indigo-400 -rotate-45" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No trips found</h3>
            <p className="text-slate-500 max-w-md mb-8">We couldn&apos;t find any trips matching your filters. Start planning your next adventure in India!</p>
            <button 
              onClick={() => router.push('/explore')}
              className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
              Explore Destinations
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
