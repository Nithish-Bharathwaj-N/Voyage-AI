'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTripStore, Reservation, ReservationType } from '@/store';
import { 
  Plane, Hotel, Train, Bus, Car, Ticket, Utensils, Calendar, 
  MapPin, Hash, IndianRupee, Clock, Search, ExternalLink, Plus
} from 'lucide-react';
import { toast } from 'sonner';

const TYPE_ICONS: Record<ReservationType, React.ElementType> = {
  flight: Plane,
  hotel: Hotel,
  train: Train,
  bus: Bus,
  rental: Car,
  activity: Ticket,
  restaurant: Utensils,
  event: Calendar
};

const TYPE_COLORS: Record<ReservationType, string> = {
  flight: 'bg-blue-50 text-blue-600 border-blue-200',
  hotel: 'bg-rose-50 text-rose-600 border-rose-200',
  train: 'bg-orange-50 text-orange-600 border-orange-200',
  bus: 'bg-amber-50 text-amber-600 border-amber-200',
  rental: 'bg-slate-50 text-slate-600 border-slate-200',
  activity: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  restaurant: 'bg-red-50 text-red-600 border-red-200',
  event: 'bg-indigo-50 text-indigo-600 border-indigo-200'
};

export default function ReservationsPage() {
  const { reservations, trips } = useTripStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Seed mock reservations if none exist
  React.useEffect(() => {
    if (reservations.length === 0) {
      useTripStore.getState().addReservation({
        id: 'r1', tripId: 't1', type: 'flight', title: 'Delhi to Kochi', provider: 'IndiGo Airlines',
        bookingReference: 'PNR-X89J21', status: 'confirmed', startDate: '2024-10-15T08:30:00Z', endDate: '2024-10-15T11:45:00Z',
        price: 8500, currency: 'INR', notes: 'Seat 12A, Window'
      });
      useTripStore.getState().addReservation({
        id: 'r2', tripId: 't1', type: 'hotel', title: 'Taj Kumarakom Resort', provider: 'Taj Hotels',
        bookingReference: 'BK-99120', status: 'confirmed', startDate: '2024-10-15T14:00:00Z', endDate: '2024-10-18T11:00:00Z',
        price: 45000, currency: 'INR', notes: 'Lake view cottage requested'
      });
      useTripStore.getState().addReservation({
        id: 'r3', tripId: 't1', type: 'activity', title: 'Houseboat Day Cruise', provider: 'Kerala Tourism',
        bookingReference: 'KT-AL-88', status: 'pending', startDate: '2024-10-16T10:00:00Z', price: 6000, currency: 'INR'
      });
    }
  }, [reservations.length]);

  const filteredReservations = reservations.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.bookingReference.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Reservations</h1>
            <p className="text-slate-500">Your central hub for all travel bookings and tickets.</p>
          </div>
          <button 
            onClick={() => toast.info('Add Reservation Dialog')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Booking
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search PNR, hotel names, airlines..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredReservations.map(res => {
              const Icon = TYPE_ICONS[res.type];
              const trip = trips.find(t => t.id === res.tripId);
              
              return (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 md:items-center relative overflow-hidden"
                >
                  {/* Left: Type Icon & Date */}
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${TYPE_COLORS[res.type]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{new Date(res.startDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                      <div className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(res.startDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-slate-900">{res.title}</h3>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                        res.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {res.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 font-medium mb-3">{res.provider}</div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        <Hash className="w-3 h-3 text-slate-400" />
                        {res.bookingReference}
                      </div>
                      {trip && (
                        <div className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                          <MapPin className="w-3 h-3" />
                          {trip.title}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Amount</div>
                      <div className="text-2xl font-black text-slate-900 flex items-center gap-0.5">
                        <IndianRupee className="w-5 h-5" />
                        {typeof res.price === 'number' ? res.price.toLocaleString('en-IN') : '0'}
                      </div>
                    </div>
                    <button 
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
                      title="View E-Ticket"
                      onClick={() => toast.success('Opening E-Ticket / Voucher')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredReservations.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <Ticket className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">No bookings found</h3>
              <p className="text-slate-500 max-w-md">Keep all your flight tickets, hotel vouchers, and activity passes in one place.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
