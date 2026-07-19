'use client';

import React from 'react';
import { Compass } from 'lucide-react';
import { DestinationCard } from '@/components/travel/DestinationCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface RecommendItem {
  id: string;
  name: string;
  country: string;
  image: string;
  rating?: number;
  tags?: string[];
}

interface ExploreRecommendationsProps {
  destinations: RecommendItem[];
  loading: boolean;
}

/**
 * Explore recommendations grid deck.
 */
export function ExploreRecommendations({ destinations, loading }: ExploreRecommendationsProps) {
  return (
    <div className="space-y-4 text-left">
      <div className="flex items-center gap-1.5 text-slate-400">
        <Compass className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-black uppercase tracking-widest">Trending Escapes</h3>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          <Skeleton variant="rect" className="aspect-[3/4]" />
          <Skeleton variant="rect" className="aspect-[3/4]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {destinations.slice(0, 2).map((item) => (
            <DestinationCard
              key={item.id}
              name={item.name}
              country={item.country}
              image={item.image}
              rating={item.rating}
              tags={item.tags}
              className="hover:scale-[1.01] transition-transform duration-200"
            />
          ))}
        </div>
      )}
    </div>
  );
}
