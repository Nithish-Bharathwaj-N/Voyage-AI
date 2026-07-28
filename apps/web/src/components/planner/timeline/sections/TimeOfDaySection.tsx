import React, { memo } from 'react';
import { ActivityCardRenderer } from '../renderer/ActivityCardRenderer';
import type { TimelineSection } from '@/lib/planner/types/planner.types';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface TimeOfDaySectionProps {
  section: TimelineSection;
  isLast: boolean;
}

export const TimeOfDaySection = memo(function TimeOfDaySection({
  section,
  isLast,
}: TimeOfDaySectionProps) {
  const activityIds = section.activities.map((a) => a.id);

  return (
    <div className="relative" role="region" aria-label={`${section.title} activities`}>
      {/* Section subheader */}
      <div className="flex items-center gap-4 mb-3 relative z-10 pl-10 sm:pl-0">
        <div className="hidden sm:flex w-10 flex-col items-center shrink-0" aria-hidden="true">
          <div className="h-1.5 w-1.5 rounded-full bg-border/70 ring-[3px] ring-background" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 select-none">
            {section.title}
          </span>
          <div className="h-px flex-1 w-16 bg-border/30 hidden sm:block" aria-hidden="true" />
        </div>
      </div>

      {/* Activity list */}
      <ol
        className="space-y-2.5 relative pl-4 sm:pl-0"
        role="list"
        aria-label={`${section.title} activities list`}
      >
        <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
          {section.activities.map((activity) => (
            <li key={activity.id} role="listitem">
              <ActivityCardRenderer activity={activity} />
            </li>
          ))}
        </SortableContext>

        {/* Drop zone indicator between sections */}
        {!isLast && (
          <li
            aria-hidden="true"
            className="flex gap-4 relative z-10 pt-1 group cursor-pointer opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-150"
          >
            <div className="hidden sm:flex w-10 shrink-0" />
            <div className="flex-1 h-1.5 bg-primary/15 rounded-full flex items-center justify-center hover:bg-primary/25 transition-colors">
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full absolute opacity-0 group-hover:opacity-100 transition-opacity">
                + Add Activity
              </span>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
});
