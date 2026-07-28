'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function HotelsList({ destination }: { destination: DetailedDestination }) {
  if (!destination.hotels || destination.hotels.length === 0) return null;

  return (
    <div id="hotels" className="scroll-mt-32 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Where to Stay</h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {destination.hotels.map((hotel) => (
          <div 
            key={hotel.id} 
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
              <Icon name="Bed" size={20} className="text-sky-500" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground truncate pr-2">{hotel.name}</h4>
                {hotel.rating && (
                  <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded text-xs shrink-0">
                    <Icon name="Star" size={10} className="fill-amber-400" />
                    <span>{hotel.rating}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-sky-400 font-medium mb-1">{hotel.priceLevel} · Hotel</p>
              {hotel.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">{hotel.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
