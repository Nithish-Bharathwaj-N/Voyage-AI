'use client';

import React from 'react';
import { TripCardSkeleton, TripListRowSkeleton } from './TripCardSkeleton';
import type { TripViewMode } from '@/lib/trips/types/trips.types';

interface TripGridSkeletonProps {
  count?: number;
  viewMode?: TripViewMode;
}

export function TripGridSkeleton({ count = 6, viewMode = 'grid' }: TripGridSkeletonProps) {
  if (viewMode === 'list' || viewMode === 'timeline') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <TripListRowSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <TripCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StatisticsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2"
        >
          <div className="h-3 w-16 rounded bg-white/5" />
          <div className="h-7 w-10 rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}
