'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/icons/Icon';
import type { SavedRestaurant } from '@/lib/collections/types/collections.types';

export function RestaurantItemCard({ item }: { item: SavedRestaurant }) {
  return (
    <div className="group flex gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors cursor-pointer">
      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-1 left-1 bg-orange-500/80 backdrop-blur-md p-1 rounded-lg">
          <Icon name="Utensils" size={12} className="text-white" />
        </div>
      </div>
      
      <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
        <div>
          <h4 className="font-bold text-foreground text-base truncate group-hover:text-orange-400 transition-colors">
            {item.name}
          </h4>
          <p className="text-sm text-orange-400/80 font-medium truncate mt-0.5">{item.priceLevel} · {item.cuisine}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          {item.rating && (
            <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded text-xs shrink-0">
              <Icon name="Star" size={10} className="fill-amber-400" />
              <span className="font-bold">{item.rating}</span>
            </div>
          )}
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Dining</span>
        </div>
      </div>
    </div>
  );
}
