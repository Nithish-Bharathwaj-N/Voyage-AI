'use client';

import * as React from 'react';
import { ItineraryCard } from './itinerary-card';
import { Destination, Activity } from '@/types';

interface TimelineViewProps {
  destinations: Destination[];
  activities: Activity[];
  onEditDestination?: (dest: Destination) => void;
  onDeleteDestination?: (id: string) => void;
  onAddActivity?: (destId: string) => void;
}

export function TimelineView({
  destinations,
  activities,
  onEditDestination,
  onDeleteDestination,
  onAddActivity,
}: TimelineViewProps) {
  const sortedDestinations = [...destinations].sort((a, b) => a.order - b.order);

  return (
    <div className="relative pl-6 space-y-8 font-sans">
      {/* Vertical Connecting Path Timeline Line */}
      <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-slate-200" />

      {sortedDestinations.map((dest) => {
        // Filter activities belonging to this destination stop
        const destActivities = activities.filter((act) => act.destinationId === dest.id);

        return (
          <div key={dest.id} className="relative group">
            {/* Timeline bullet highlight indicator */}
            <div className="absolute -left-[19px] top-6 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm z-10 group-hover:scale-125 transition-transform" />
            
            <ItineraryCard
              destination={dest}
              activities={destActivities}
              onEditDestination={onEditDestination}
              onDeleteDestination={onDeleteDestination}
              onAddActivity={onAddActivity}
            />
          </div>
        );
      })}
    </div>
  );
}
