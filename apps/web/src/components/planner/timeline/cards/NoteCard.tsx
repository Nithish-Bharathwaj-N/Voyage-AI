import React from 'react';
import { BaseCard } from './BaseCard';
import type { GenericActivity } from '@/lib/planner/types/planner.types';

export function NoteCard({ activity }: { activity: GenericActivity }) {
  return (
    <BaseCard activity={activity} icon="StickyNote" iconColorClass="bg-yellow-500">
      {/* For notes, the title is usually the note itself, but if there are additional details, we render them */}
      {activity.notes && <p className="text-xs font-medium text-foreground">{activity.notes}</p>}
    </BaseCard>
  );
}
