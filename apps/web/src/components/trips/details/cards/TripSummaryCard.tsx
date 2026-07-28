'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';
function getRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days} days ago`;
}

export function TripSummaryCard({ trip }: { trip: WorkspaceTrip }) {
  const updatedAgo = getRelativeTime(trip.updatedAt);
  
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="Info" size={20} className="text-primary" />
        </div>
        {trip.isFavorite && (
          <Icon name="Heart" size={20} className="text-rose-500 fill-rose-500" />
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Duration</h3>
        <p className="text-xl font-bold text-foreground mt-1">{trip.durationLabel}</p>
        
        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground">
          <Icon name="Clock" size={14} />
          Updated {updatedAgo}
        </div>
      </div>
    </div>
  );
}
