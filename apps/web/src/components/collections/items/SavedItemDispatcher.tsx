'use client';

import React from 'react';
import type { SavedItem } from '@/lib/collections/types/collections.types';
import { DestinationItemCard } from './DestinationItemCard';
import { TripItemCard } from './TripItemCard';
import { HotelItemCard } from './HotelItemCard';
import { RestaurantItemCard } from './RestaurantItemCard';
import { ActivityItemCard } from './ActivityItemCard';

export function SavedItemDispatcher({ item }: { item: SavedItem }) {
  switch (item.type) {
    case 'destination':
      return <DestinationItemCard item={item} />;
    case 'trip':
      return <TripItemCard item={item} />;
    case 'hotel':
      return <HotelItemCard item={item} />;
    case 'restaurant':
      return <RestaurantItemCard item={item} />;
    case 'activity':
      return <ActivityItemCard item={item} />;
    default:
      return null;
  }
}
