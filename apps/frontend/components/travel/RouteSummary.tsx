'use client';

import React from 'react';
import { Calendar, MapPin, Navigation } from 'lucide-react';

export interface RouteSummaryProps {
  daysCount: number;
  stopsCount: number;
  totalDistance?: string;
  className?: string;
}

/**
 * Visual route metrics line for itinerary planner workspaces.
 */
export function RouteSummary({ daysCount, stopsCount, totalDistance = '120 km', className = '' }: RouteSummaryProps) {
  return (
    <div className={`flex items-center gap-6 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit text-left shrink-0 select-none ${className}`}>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-slate-400" />
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Days</span>
          <p className="text-xs font-black text-slate-900 leading-none">{daysCount}</p>
        </div>
      </div>

      <div className="w-px h-6 bg-slate-200" />

      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-slate-400" />
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Stops</span>
          <p className="text-xs font-black text-slate-900 leading-none">{stopsCount}</p>
        </div>
      </div>

      <div className="w-px h-6 bg-slate-200" />

      <div className="flex items-center gap-2">
        <Navigation className="w-4 h-4 text-slate-400" />
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Distance</span>
          <p className="text-xs font-black text-slate-900 leading-none">{totalDistance}</p>
        </div>
      </div>
    </div>
  );
}
