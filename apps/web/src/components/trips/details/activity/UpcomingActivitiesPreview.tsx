'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function UpcomingActivitiesPreview({ trip }: { trip: WorkspaceTrip }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Icon name="CalendarHeart" size={20} className="text-emerald-400" />
          </div>
          <h3 className="font-semibold text-foreground">Upcoming Activities</h3>
        </div>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View Itinerary
        </button>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
          <Icon name="CalendarPlus" size={24} className="text-muted-foreground" />
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-1">No activities planned yet</h4>
        <p className="text-xs text-muted-foreground max-w-[250px]">
          Start building your itinerary to see upcoming activities here.
        </p>
        <button className="mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors border border-white/10">
          Open Planner
        </button>
      </div>
    </div>
  );
}
