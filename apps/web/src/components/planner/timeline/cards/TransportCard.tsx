import React from 'react';
import { BaseCard } from './BaseCard';
import type { GenericActivity } from '@/lib/planner/types/planner.types';

export function TransportCard({ activity }: { activity: GenericActivity }) {
  return (
    <BaseCard activity={activity} icon="Train" iconColorClass="bg-green-500">
      {activity.notes && <p className="text-xs text-muted-foreground">{activity.notes}</p>}
    </BaseCard>
  );
}
