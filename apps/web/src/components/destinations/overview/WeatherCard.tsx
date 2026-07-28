'use client';

import React from 'react';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';
import { Icon } from '@/components/icons/Icon';

export function WeatherCard({ destination }: { destination: DetailedDestination }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-sky-500/10 rounded-xl">
          <Icon name="CloudRain" size={20} className="text-sky-500" />
        </div>
        <h3 className="font-semibold text-foreground">Current Weather</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-foreground">
          {destination.weather.current.tempC}°C
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{destination.weather.current.condition}</p>
      
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="ArrowUp" size={12} className="text-rose-400" />
          <span>High {destination.weather.averageHigh}°</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon name="ArrowDown" size={12} className="text-sky-400" />
          <span>Low {destination.weather.averageLow}°</span>
        </div>
      </div>
    </div>
  );
}
