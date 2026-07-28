'use client';

import React from 'react';
import { DestinationCard, DestinationCardVariant } from '../cards/DestinationCard';
import { SwipeableCarousel } from '../carousel/SwipeableCarousel';
import { ExploreDestination } from '@/lib/services/explore';

export type SectionLayout = 'grid' | 'carousel' | 'horizontal';

interface DiscoverySectionProps {
  title: string;
  description?: string;
  destinations: ExploreDestination[];
  layout?: SectionLayout;
  cardVariant?: DestinationCardVariant;
  onPreview?: (destination: ExploreDestination) => void;
  onPlan?: (destination: ExploreDestination) => void;
}

export function DiscoverySection({
  title,
  description,
  destinations,
  layout = 'grid',
  cardVariant = 'standard',
  onPreview,
  onPlan,
}: DiscoverySectionProps) {
  if (destinations.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 w-full py-4 border-b border-border/40 last:border-b-0">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-xl font-bold tracking-tight text-foreground">{title}</h3>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>

      {layout === 'carousel' ? (
        <SwipeableCarousel>
          {destinations.map((d) => (
            <div key={d.id} className="w-[280px] sm:w-[300px]">
              <DestinationCard 
                destination={d} 
                variant={cardVariant} 
                onPreview={onPreview} 
                onPlan={onPlan} 
              />
            </div>
          ))}
        </SwipeableCarousel>
      ) : layout === 'horizontal' ? (
        <div className="flex flex-col gap-4">
          {destinations.map((d) => (
            <DestinationCard 
              key={d.id} 
              destination={d} 
              variant="horizontal" 
              onPreview={onPreview} 
              onPlan={onPlan} 
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <DestinationCard 
              key={d.id} 
              destination={d} 
              variant={cardVariant} 
              onPreview={onPreview} 
              onPlan={onPlan} 
            />
          ))}
        </div>
      )}
    </section>
  );
}
