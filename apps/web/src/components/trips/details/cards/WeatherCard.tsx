'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function WeatherCard({ trip }: { trip: WorkspaceTrip }) {
  const weather = trip.weatherPreview;

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors relative overflow-hidden">
      {/* Decorative gradient for weather */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
      
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
          {/* @ts-expect-error - generic icon */}
          <Icon name={weather?.icon || 'Sun'} size={20} className="text-amber-500" />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Forecast</h3>
        <p className="text-xl font-bold text-foreground mt-1">
          {weather ? `${weather.tempC}°C` : 'N/A'}
        </p>
        
        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground">
          <Icon name="Cloud" size={14} />
          {weather?.condition || 'Check closer to date'}
        </div>
      </div>
    </div>
  );
}
