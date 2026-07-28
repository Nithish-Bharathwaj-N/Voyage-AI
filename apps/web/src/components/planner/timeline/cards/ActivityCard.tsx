import React from 'react';
import { BaseCard } from './BaseCard';
import type { GenericActivity } from '@/lib/planner/types/planner.types';

export function ActivityCard({ activity }: { activity: GenericActivity }) {
  return (
    <BaseCard activity={activity} icon="Camera" iconColorClass="bg-primary">
      {activity.notes && <p className="text-xs text-muted-foreground">{activity.notes}</p>}
    </BaseCard>
  );
}
