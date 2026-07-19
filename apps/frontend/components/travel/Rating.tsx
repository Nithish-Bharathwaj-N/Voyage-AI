'use client';

import React from 'react';
import { Star } from 'lucide-react';

export interface RatingProps {
  rating: number;
  max?: number;
  className?: string;
}

/**
 * Reusable star rating visual component.
 */
export function Rating({ rating, max = 5, className = '' }: RatingProps) {
  const rounded = Math.round(rating);

  return (
    <div className={`flex items-center gap-0.5 select-none shrink-0 ${className}`}>
      {Array.from({ length: max }).map((_, idx) => {
        const active = idx < rounded;

        return (
          <Star
            key={idx}
            className={`w-3.5 h-3.5 ${
              active ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
            }`}
          />
        );
      })}
      <span className="text-[10px] font-black text-slate-800 ml-1.5 leading-none">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
