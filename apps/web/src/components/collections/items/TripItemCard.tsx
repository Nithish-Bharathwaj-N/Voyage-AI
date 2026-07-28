'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import type { SavedTrip } from '@/lib/collections/types/collections.types';

export function TripItemCard({ item }: { item: SavedTrip }) {
  return (
    <Link 
      href={`/trips/${item.tripId}`}
      className="group flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-1 left-1 bg-indigo-500/80 backdrop-blur-md p-1 rounded-lg">
          <Icon name="Compass" size={12} className="text-white" />
        </div>
      </div>
      
      <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
        <div>
          <h4 className="font-bold text-foreground text-base truncate group-hover:text-indigo-400 transition-colors">
            {item.title}
          </h4>
          {item.dateRange && (
            <p className="text-xs text-muted-foreground truncate mt-1 flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              {item.dateRange}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-end mt-2">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Trip</span>
        </div>
      </div>
    </Link>
  );
}
