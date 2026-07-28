'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { ActivityTimelineEvent } from '@/lib/profile/types/profile.types';

export function ActivityTimeline({ events }: { events: ActivityTimelineEvent[] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-primary/10 rounded-xl">
          <Icon name="Activity" size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
      </div>
      
      <div className="relative border-l-2 border-white/10 ml-6 space-y-8 pb-4">
        {events.map((event, i) => {
          let colorClass = 'text-primary bg-primary/20';
          if (event.type === 'destination_saved') colorClass = 'text-rose-400 bg-rose-500/20';
          if (event.type === 'collection_created') colorClass = 'text-sky-400 bg-sky-500/20';
          if (event.type === 'achievement_unlocked') colorClass = 'text-amber-400 bg-amber-500/20';
          
          return (
            <div key={event.id} className="relative pl-8">
              {/* Timeline dot */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-background border-2 border-white/10 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClass}`}>
                  {/* @ts-expect-error dynamic icon */}
                  <Icon name={event.icon || 'Circle'} size={12} className="currentColor" />
                </div>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-colors">
                <h4 className="text-sm font-bold text-foreground mb-1">{event.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="text-xs font-medium text-white/40">
                  {new Date(event.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
