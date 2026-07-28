'use client';

import React from 'react';
import type { AIDailyActivity } from '@/lib/ai/planner/types';
import { Icon } from '@/components/icons/Icon';

interface ActivityCardProps {
  activity: AIDailyActivity;
  type: 'morning' | 'afternoon' | 'evening' | 'meals';
}

export function ActivityCard({ activity, type }: ActivityCardProps) {
  const getIcon = () => {
    switch(type) {
      case 'morning': return 'Sunrise';
      case 'afternoon': return 'Sun';
      case 'evening': return 'Moon';
      case 'meals': return 'Utensils';
      default: return 'MapPin';
    }
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-card border border-white/5 hover:border-white/20 transition-colors group relative">
      <div className="w-12 text-sm font-bold text-muted-foreground pt-1 shrink-0">
        {activity.time}
      </div>
      
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
        <Icon name={getIcon()} size={16} className="text-primary" />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-foreground text-lg">{activity.title}</h4>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{activity.description}</p>
        
        <div className="flex items-center gap-4 mt-3 text-xs font-medium">
          {activity.location && (
            <div className="flex items-center gap-1.5 text-foreground/80">
              <Icon name="MapPin" size={14} />
              {activity.location}
            </div>
          )}
          {activity.estimatedCost !== undefined && (
            <div className="flex items-center gap-1.5 text-green-400">
              <Icon name="DollarSign" size={14} />
              ${activity.estimatedCost}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions (Hover) */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-foreground transition-colors" title="Swap Alternative">
          <Icon name="RefreshCcw" size={14} />
        </button>
        <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-destructive transition-colors" title="Remove Activity">
          <Icon name="Trash2" size={14} />
        </button>
      </div>
    </div>
  );
}
