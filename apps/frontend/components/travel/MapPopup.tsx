'use client';

import React from 'react';
import { MapPin, Clock } from 'lucide-react';

export interface MapPopupProps {
  title: string;
  category?: string;
  time?: string;
  className?: string;
}

/**
 * Premium presentational map tooltip popup overlay.
 */
export function MapPopup({ title, category = 'Sightseeing', time, className = '' }: MapPopupProps) {
  return (
    <div className={`bg-white border border-slate-100 rounded-xl p-3 shadow-lg flex flex-col gap-1.5 max-w-[180px] text-left select-none relative ${className}`}>
      <div className="space-y-0.5">
        <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 leading-none">{category}</span>
        <h4 className="text-xs font-black text-slate-900 leading-tight truncate">{title}</h4>
      </div>
      {time && (
        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
          <Clock className="w-2.5 h-2.5" />
          <span>{time}</span>
        </div>
      )}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white z-10" />
    </div>
  );
}
