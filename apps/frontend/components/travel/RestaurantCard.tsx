'use client';

import React from 'react';
import { Star, MapPin, Tag } from 'lucide-react';
import { Card } from '../ui/Card';

export interface RestaurantCardProps {
  name: string;
  cuisine: string;
  priceRange: '$$' | '$$$' | '$$$$';
  rating?: number;
  address: string;
  image: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable restaurant card for explore and collections views.
 */
export function RestaurantCard({
  name,
  cuisine,
  priceRange,
  rating = 4.3,
  address,
  image,
  onClick,
  className = '',
}: RestaurantCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`group cursor-pointer hover:shadow-md hover:border-slate-200:border-slate-700/60 overflow-hidden text-left ${className}`}
    >
      <div className="h-32 bg-slate-100 relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
        <div className="absolute top-2.5 right-2.5 z-10 bg-white/95 shadow-sm px-2 py-0.5 rounded-lg text-[9px] font-black text-slate-800 uppercase tracking-wide">
          ★ {rating}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="space-y-0.5">
          <h4 className="text-xs font-black text-slate-900 leading-none truncate pr-4">
            {name}
          </h4>
          <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
            <MapPin className="w-3 h-3 text-slate-355 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-1 border-t border-slate-50 shrink-0">
          <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
            <Tag className="w-3 h-3 text-slate-350 shrink-0" />
            <span className="uppercase tracking-wider">{cuisine}</span>
          </div>
          <span className="text-[10px] font-black text-slate-950">
            {priceRange}
          </span>
        </div>
      </div>
    </Card>
  );
}
