'use client';
import React, { Suspense } from 'react';
import { usePlannerSuspense } from '../../../lib/planner/hooks/usePlanner';
import { DaySection } from '../timeline/day/DaySection';
import { TimelineSkeleton } from '../timeline/skeletons/TimelineSkeleton';
import { EmptyTimeline } from '../timeline/shared/EmptyTimeline';
import { PlannerDndContext } from '../interactions/drag/PlannerDndContext';
import { PlannerErrorBoundary } from '../../../lib/planner/utils/PlannerErrorBoundary';

// ─── Inner async component that suspends ──────────────────────
function PlannerCanvasContent({ tripId }: { tripId: string }) {
  const { data: itinerary } = usePlannerSuspense(tripId);

  if (!itinerary.days || itinerary.days.length === 0) {
    return <EmptyTimeline tripId={tripId} />;
  }

  return (
    <PlannerDndContext>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-32">
        {itinerary.days.map((day, index) => (
          <DaySection key={day.id} dayIndex={index} day={day} />
        ))}
      </div>
    </PlannerDndContext>
  );
}

// ─── Public export — wraps in error boundary + suspense ───────
export function PlannerCanvas({ tripId = 't-1' }: { tripId?: string }) {
  return (
    <div className="flex-1 overflow-y-auto w-full bg-muted/10 relative">
      <PlannerErrorBoundary>
        <Suspense fallback={<TimelineSkeleton />}>
          <PlannerCanvasContent tripId={tripId} />
        </Suspense>
      </PlannerErrorBoundary>
    </div>
  );
}
