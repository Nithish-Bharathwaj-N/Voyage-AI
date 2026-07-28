import React, { memo } from 'react';
import type {
  PlannerActivity,
  FlightActivity,
  HotelActivity,
  RestaurantActivity,
  GenericActivity,
} from '@/lib/planner/types/planner.types';
import { FlightCard } from '../cards/FlightCard';
import { HotelCard } from '../cards/HotelCard';
import { RestaurantCard } from '../cards/RestaurantCard';
import { TransportCard } from '../cards/TransportCard';
import { NoteCard } from '../cards/NoteCard';
import { ActivityCard } from '../cards/ActivityCard';

interface ActivityCardRendererProps {
  activity: PlannerActivity;
}

export const ActivityCardRenderer = memo(function ActivityCardRenderer({
  activity,
}: ActivityCardRendererProps) {
  switch (activity.type) {
    case 'flight':
      return <FlightCard activity={activity as FlightActivity} />;
    case 'hotel':
      return <HotelCard activity={activity as HotelActivity} />;
    case 'restaurant':
      return <RestaurantCard activity={activity as RestaurantActivity} />;
    case 'transport':
      return <TransportCard activity={activity as GenericActivity} />;
    case 'note':
      return <NoteCard activity={activity as GenericActivity} />;
    case 'activity':
    default:
      return <ActivityCard activity={activity as GenericActivity} />;
  }
});
