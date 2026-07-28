import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { TripsWorkspace } from '@/components/trips/TripsWorkspace';
import { TripGridSkeleton } from '@/components/trips/skeleton/TripGridSkeleton';

export const metadata: Metadata = {
  title: 'My Trips | VoyageAI',
  description: 'Plan, track, and manage all your travel adventures in one premium workspace.',
};

export default function TripsPage() {
  return (
    <div className="p-6 md:p-8">
      <Suspense fallback={<TripGridSkeleton count={6} />}>
        <TripsWorkspace />
      </Suspense>
    </div>
  );
}
