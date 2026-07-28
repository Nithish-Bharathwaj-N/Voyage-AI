import React from 'react';
import { Heading } from '../../typography/Heading';
import { TripCard } from './TripCard';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import type { Trip } from '../../../lib/services/dashboard';

interface RecentTripsProps {
  trips: Trip[];
}

export function RecentTrips({ trips }: RecentTripsProps) {
  if (!trips || trips.length === 0) {
    return (
      <div className="mb-10">
        <Heading level={3} className="mb-4">Recent Trips</Heading>
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border bg-muted/20">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Icon name="Map" className="text-muted-foreground" />
          </div>
          <h4 className="font-semibold mb-1">No trips yet</h4>
          <p className="text-sm text-muted-foreground mb-4 max-w-sm">
            Create your first trip to start organizing your travel plans in the spatial workspace.
          </p>
          <Button variant="outline" size="sm">Create Trip</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <Heading level={3}>Recent Trips</Heading>
        <a href="/app/trips" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          View all <Icon name="ArrowRight" size={14} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}
