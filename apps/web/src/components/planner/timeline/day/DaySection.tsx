"use client";
import React, { memo, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DayHeader } from './DayHeader';
import { TimeOfDaySection } from '../sections/TimeOfDaySection';
import type { TimelineDay } from '@/lib/planner/types/planner.types';
import { useExpandedDayIds, usePlannerUIStore } from '@/lib/planner/store/plannerUIStore';

interface DaySectionProps {
  dayIndex: number;
  day: TimelineDay;
}

export const DaySection = memo(function DaySection({ dayIndex, day }: DaySectionProps) {
  const expandedDayIds = useExpandedDayIds();
  const panelId = useId();

  // Days start expanded by default unless explicitly collapsed in the store
  const isExpanded = !expandedDayIds.includes(`collapsed-${day.id}`);

  const handleToggle = () => {
    if (isExpanded) {
      // Collapse by adding to the collapsed list
      usePlannerUIStore.setState((s) => ({
        expandedDayIds: [...s.expandedDayIds, `collapsed-${day.id}`],
      }));
    } else {
      // Expand by removing from the collapsed list
      usePlannerUIStore.setState((s) => ({
        expandedDayIds: s.expandedDayIds.filter((id) => id !== `collapsed-${day.id}`),
      }));
    }
  };

  return (
    <section
      className="mb-10 relative"
      aria-label={`Day ${dayIndex + 1}: ${day.title}`}
    >
      <DayHeader
        dayIndex={dayIndex}
        day={day}
        isExpanded={isExpanded}
        onToggleExpand={handleToggle}
        panelId={panelId}
      />

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            role="region"
            aria-label={`${day.title} activities`}
          >
            {/* Vertical timeline ruler */}
            <div
              className="absolute left-[19px] top-[68px] bottom-0 w-px bg-border/40 hidden sm:block"
              aria-hidden="true"
            />

            <div className="flex flex-col gap-5 relative pt-1">
              {day.sections.map((section, idx) => (
                <TimeOfDaySection
                  key={section.id}
                  section={section}
                  isLast={idx === day.sections.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});
