'use client';

import React from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

interface WeatherCardProps {
  destination: string;
  notes?: string;
}

/**
 * Renders a weather summary card. Notes come from AI-generated itinerary context.
 */
export function WeatherCard({ destination, notes }: WeatherCardProps) {
  if (!notes) return null;

  const icon = /rain|storm|shower/.test(notes.toLowerCase())
    ? <CloudRain className="w-5 h-5 text-blue-500" />
    : /wind|breezy/.test(notes.toLowerCase())
    ? <Wind className="w-5 h-5 text-slate-500" />
    : /cloud|overcast/.test(notes.toLowerCase())
    ? <Cloud className="w-5 h-5 text-slate-400" />
    : <Sun className="w-5 h-5 text-amber-500" />;

  return (
    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-sky-50 to-blue-50 p-4 space-y-2 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Weather</p>
          <p className="text-xs font-bold text-slate-700">{destination}</p>
        </div>
      </div>
      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{notes}</p>
    </div>
  );
}
