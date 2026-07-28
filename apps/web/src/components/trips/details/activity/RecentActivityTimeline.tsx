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

export function RecentActivityTimeline({ trip }: { trip: WorkspaceTrip }) {
  // Placeholder activity data
  const activities = [
    { id: 1, action: 'Trip created', user: 'You', time: trip.createdAt, icon: 'Plus' },
    { id: 2, action: 'Updated dates', user: 'You', time: trip.updatedAt, icon: 'Calendar' },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-rose-500/10 rounded-lg">
          <Icon name="Activity" size={20} className="text-rose-400" />
        </div>
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
        {activities.map((act) => (
          <div key={act.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {/* @ts-expect-error - generic icon */}
              <Icon name={act.icon} size={16} className="text-muted-foreground" />
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">{act.action}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                By {act.user} · {getRelativeTime(act.time as string)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
