import React from 'react';
import { BaseCard } from './BaseCard';
import { Icon } from '@/components/icons/Icon';
import type { FlightActivity } from '@/lib/planner/types/planner.types';

export function FlightCard({ activity }: { activity: FlightActivity }) {
  return (
    <BaseCard activity={activity} icon="Plane" iconColorClass="bg-blue-500">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Flight</span>
          <span className="font-medium text-foreground">{activity.airline} {activity.flightNumber}</span>
        </div>
        {activity.terminal && (
          <div className="flex flex-col border-l border-border/50 pl-6">
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Terminal</span>
            <span className="font-medium text-foreground">{activity.terminal}</span>
          </div>
        )}
      </div>
      {activity.notes && (
        <div className="mt-3 text-xs bg-blue-500/5 text-blue-700/80 p-2 rounded flex gap-2">
          <Icon name="Info" size={14} className="shrink-0 mt-0.5" />
          <p>{activity.notes}</p>
        </div>
      )}
    </BaseCard>
  );
}
