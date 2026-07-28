'use client';

import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface DestinationCardProps {
  name: string;
  country: string;
  image: string;
  rating?: number;
  tags?: string[];
  onClick?: () => void;
  className?: string;
}

/**
 * Premium destination card for explore views.
 */
export function DestinationCard({
  name,
  country,
  image,
  rating = 4.8,
  tags = [],
  onClick,
  className = '',
}: DestinationCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`group cursor-pointer hover:shadow-md hover:border-slate-200:border-slate-700/60 aspect-[3/4] relative overflow-hidden ${className}`}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102 absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent z-10" />

      {/* Floating Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-[80%]">
        {tags.map((tag) => (
          <Badge key={tag} className="!bg-white/90 !text-slate-900 shadow-sm">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Details Box */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-left space-y-2">
        <div className="space-y-0.5">
          <h3 className="text-lg font-black text-white font-display leading-tight">{name}</h3>
          <div className="flex items-center gap-1.5 text-xs text-white/80 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{country}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-1 text-xs font-bold text-white">
            <span className="text-amber-400">★</span>
            <span>{rating}</span>
          </div>
          <span className="text-white text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Card>
  );
}
