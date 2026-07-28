import React from 'react';
import { Heading } from '../../typography/Heading';
import type { Activity } from '../../../lib/services/dashboard';
import { Icon } from '@/components/icons/Icon';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="mb-10">
      <Heading level={3} className="mb-4">Recent Activity</Heading>
      <div className="relative border-l border-border/50 ml-4 pl-6 space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            <div className="absolute -left-[35px] h-4 w-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{activity.message}</p>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
