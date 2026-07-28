'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { ProfileStats as Stats } from '@/lib/profile/types/profile.types';

export function ProfileStats({ stats }: { stats: Stats }) {
  const statBlocks = [
    { label: 'Trips', value: stats.tripsCompleted, icon: 'Compass', color: 'text-indigo-400' },
    { label: 'Countries', value: stats.countriesVisited, icon: 'Globe', color: 'text-emerald-400' },
    { label: 'Saved', value: stats.destinationsSaved, icon: 'Heart', color: 'text-rose-400' },
    { label: 'Score', value: stats.travelScore, icon: 'Award', color: 'text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {statBlocks.map((stat, i) => (
        <div key={i} className="bg-card border border-white/10 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
            {/* @ts-expect-error dynamic icon */}
            <Icon name={stat.icon} size={24} className={stat.color} />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
