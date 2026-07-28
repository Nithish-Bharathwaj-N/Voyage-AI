'use client';

import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';

export interface HotelCardProps {
  name: string;
  pricePerNight: number;
  rating?: number;
  address: string;
  image: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable hotel card for explore and collections views.
 */
export function HotelCard({
  name,
  pricePerNight,
  rating = 4.5,
  address,
  image,
  link,
  onClick,
  className = '',
}: HotelCardProps) {
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
          <div className="flex items-center justify-between shrink-0">
            <h4 className="text-xs font-black text-slate-900 leading-none truncate pr-4">
              {name}
            </h4>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1 text-[9px] font-semibold text-slate-400">
            <MapPin className="w-3 h-3 text-slate-350 shrink-0" />
            <span className="truncate">{address}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-1 border-t border-slate-50 shrink-0">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rate</span>
          <span className="text-xs font-black text-slate-900">
            ${pricePerNight} <span className="text-[9px] text-slate-400 font-bold">/ night</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
