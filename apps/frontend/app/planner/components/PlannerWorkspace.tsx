'use client';

import React from 'react';
import { RouteSummary } from '@/components/travel/RouteSummary';
import { BudgetSummary } from './BudgetSummary';
import { WeatherSummary } from './WeatherSummary';
import { DayAccordion } from './DayAccordion';
import { PlannerState } from '@/types/itinerary';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import { SortableActivityCard } from '@/components/travel/SortableActivityCard';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Compass, Sparkles, MapPin, Navigation, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripBuilderForm } from './TripBuilderForm';

interface PlannerWorkspaceProps {
  plannerState: PlannerState | null;
  loading: boolean;
  activeDayIndex: number;
  onActiveDayChange: (idx: number) => void;
  onEditActivity?: (dayIdx: number, actIdx: number) => void;
  onDeleteActivity?: (dayIdx: number, actIdx: number) => void;
  hoveredActivityId?: string | null;
  onHoverActivity?: (id: string | null) => void;
  onActiveActivity?: (id: string | null) => void;
  onMoveActivity?: (activityId: string, sourceDayIdx: number, destDayIdx: number, destIndex: number) => void;
  liveParameters?: Partial<{
    destination: string;
    duration: string;
    budget: string;
    companions: string;
    style: string;
    accommodation: string;
    food: string;
    transport: string;
    specialRequests: string;
  }>;
  onSelectParameter?: (key: string, value: string) => void;
  onGenerateItinerary?: () => void;
}

/**
 * Planner Workspace (Center Panel). Displays scrollable days list, collapsible activity
 * timeline summaries, and budget statistics headers.
 */
export function PlannerWorkspace({
  plannerState,
  loading,
  activeDayIndex,
  onActiveDayChange,
  onEditActivity,
  onDeleteActivity,
  hoveredActivityId,
  onHoverActivity,
  onActiveActivity,
  onMoveActivity,
  liveParameters,
  onSelectParameter,
  onGenerateItinerary,
}: PlannerWorkspaceProps) {

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const [activeDragId, setActiveDragId] = React.useState<string | null>(null);

  const handleDragStart = (event: any) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragId(null);
    const { active, over } = event;
    if (!over || !onMoveActivity || !plannerState) return;

    if (active.id !== over.id) {
      // Find source day and index
      let sourceDayIdx = -1;
      let destDayIdx = -1;
      let destIndex = -1;
      
      plannerState.timeline.forEach((day: any, dIdx: number) => {
        const aIdx = day.activities.findIndex((a: any) => a.id === active.id);
        if (aIdx !== -1) {
          sourceDayIdx = dIdx;
        }
        
        const oIdx = day.activities.findIndex((a: any) => a.id === over.id);
        if (oIdx !== -1) {
           destDayIdx = dIdx;
           destIndex = oIdx;
        }
      });
      
      // If dropped on an empty day container, over.id might be the day ID, but let's assume dropping on another item for now.
      if (sourceDayIdx !== -1 && destDayIdx !== -1) {
         onMoveActivity(active.id as string, sourceDayIdx, destDayIdx, destIndex);
      }
    }
  };

  // Find dragged activity for overlay
  const draggedActivity = React.useMemo(() => {
    if (!plannerState || !activeDragId) return null;
    for (const day of plannerState.timeline) {
      const act = day.activities.find(a => a.id === activeDragId);
      if (act) return act;
    }
    return null;
  }, [activeDragId, plannerState]);
  
  if (loading && !plannerState) {
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4 flex-wrap">
          <Skeleton variant="rect" className="h-24 w-48 rounded-2xl" />
          <Skeleton variant="rect" className="h-24 w-40 rounded-2xl" />
          <Skeleton variant="rect" className="h-24 w-32 rounded-2xl" />
        </div>
        {/* Day Accordion Skeletons */}
        <div className="space-y-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton variant="circle" className="w-8 h-8 shrink-0" />
              <div className="space-y-3 flex-1">
                <Skeleton variant="rect" className="h-12 w-full rounded-2xl" />
                <Skeleton variant="rect" className="h-20 w-5/6 rounded-2xl ml-4 opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!plannerState) {
    return (
      <TripBuilderForm 
        liveParameters={liveParameters || {}}
        onSelectParameter={onSelectParameter || (() => {})}
        onGenerate={onGenerateItinerary || (() => {})}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 scrollbar-thin text-left select-none">
      <h2 className="text-xl font-black text-slate-900 truncate">Your trip to {plannerState.trip.destination}</h2>
      <div className="flex gap-4 text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> {plannerState.statistics.stops || 0} stops</div>
        <div className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5"/> {plannerState.statistics.walking || 0} km walking</div>
        <div className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5"/> {plannerState.budget.currency || 'USD'} {plannerState.budget.total || 0} est.</div>
      </div>

      {/* Visual statistics header row */}
      <div className="flex items-center gap-4 flex-wrap shrink-0">
        <RouteSummary
          daysCount={plannerState.timeline.length}
          stopsCount={plannerState.statistics.stops}
          totalDistance={`${plannerState.timeline.length * 15} km`}
          className="shadow-sm"
        />
        <BudgetSummary budget={plannerState.budget} />
        {plannerState.weather && (
          <WeatherSummary temp={plannerState.weather.temp} condition={plannerState.weather.condition} />
        )}
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {(plannerState.timeline ?? []).map((day, idx) => (
          <DayAccordion
            key={day.day}
            dayNumber={day.day}
            theme={day.theme || ''}
            activities={day.activities as any}
            isOpen={idx === activeDayIndex}
            onToggle={() => onActiveDayChange(idx)}
            dayIndex={idx}
            onEditActivity={onEditActivity}
            onDeleteActivity={onDeleteActivity}
            hoveredActivityId={hoveredActivityId}
            onHoverActivity={onHoverActivity}
            onActiveActivity={onActiveActivity}
          />
        ))}
      </div>
    </div>
  );
}
