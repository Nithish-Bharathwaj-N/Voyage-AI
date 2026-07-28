'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';

export function DestinationHero({ destination }: { destination: DetailedDestination }) {
  return (
    <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden bg-zinc-900 group">
      {destination.coverImageUrl && (
        <Image
          src={destination.coverImageUrl}
          alt={destination.city}
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      )}
      
      {/* Gradients to protect text contrast */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-wider border border-white/20">
                  DESTINATION
                </span>
                <div className="flex items-center gap-1.5 text-amber-400 bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-amber-400/20">
                  <Icon name="Star" size={14} className="fill-amber-400" />
                  <span className="text-xs font-bold text-white">{destination.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-white/70">({destination.reviewCount.toLocaleString()})</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 tracking-tight">
                {destination.city}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 font-medium flex items-center gap-2">
                <Icon name="MapPin" size={24} className="text-primary" />
                {destination.country}
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm font-medium text-white/80">
              <div className="flex items-center gap-2">
                <Icon name="Sun" size={18} className="text-amber-400" />
                <span>Best Season: {destination.bestSeason}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
