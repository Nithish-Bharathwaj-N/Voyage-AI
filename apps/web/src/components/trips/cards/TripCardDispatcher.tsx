'use client';

import React from 'react';
import { StandardCard, FeaturedCard, CompactCard, ListCard, TimelineCard, TemplateCard } from './TripCards';
import type { WorkspaceTrip, TripCardVariant, TripQuickAction } from '@/lib/trips/types/trips.types';

interface TripCardDispatcherProps {
  trip: WorkspaceTrip;
  variant: TripCardVariant;
  isSelected: boolean;
  onSelect: (id: string, multi: boolean) => void;
  onQuickAction: (id: string, action: TripQuickAction) => void;
}

export const TripCardDispatcher = React.memo(function TripCardDispatcher({
  trip,
  variant,
  isSelected,
  onSelect,
  onQuickAction,
}: TripCardDispatcherProps) {
  const props = { trip, isSelected, onSelect, onQuickAction };

  switch (variant) {
    case 'featured':
      return <FeaturedCard {...props} />;
    case 'compact':
      return <CompactCard {...props} />;
    case 'list':
      return <ListCard {...props} />;
    case 'timeline':
      return <TimelineCard {...props} />;
    case 'template':
      return <TemplateCard {...props} />;
    case 'standard':
    default:
      return <StandardCard {...props} />;
  }
});
