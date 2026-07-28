'use client';

import React from 'react';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';
import { TripSummaryCard } from '../cards/TripSummaryCard';
import { BudgetOverviewCard } from '../cards/BudgetOverviewCard';
import { WeatherCard } from '../cards/WeatherCard';
import { TravelerCard } from '../cards/TravelerCard';
import { ProgressCard } from '../cards/ProgressCard';
import { DestinationHighlights } from '../activity/DestinationHighlights';
import { UpcomingActivitiesPreview } from '../activity/UpcomingActivitiesPreview';
import { RecentActivityTimeline } from '../activity/RecentActivityTimeline';

export function TripOverview({ trip }: { trip: WorkspaceTrip }) {
  return (
    <div className="space-y-6">
      {/* Top Grid: High level stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TripSummaryCard trip={trip} />
        <BudgetOverviewCard trip={trip} />
        <WeatherCard trip={trip} />
        <TravelerCard trip={trip} />
      </div>

      {/* Middle section: Progress & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DestinationHighlights trip={trip} />
          <UpcomingActivitiesPreview trip={trip} />
        </div>
        <div className="space-y-6">
          <ProgressCard trip={trip} />
          <RecentActivityTimeline trip={trip} />
        </div>
      </div>
    </div>
  );
}
