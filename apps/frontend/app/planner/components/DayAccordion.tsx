'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Star, DollarSign, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ActivityCard } from '@/components/travel/ActivityCard';
import { SortableActivityCard } from '@/components/travel/SortableActivityCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ActivityItem } from '@/types/itinerary';

interface DayAccordionProps {
  dayNumber: number;
  theme: string;
  activities: ActivityItem[];
  isOpen: boolean;
  onToggle: () => void;
  onEditActivity?: (dayIdx: number, actIdx: number) => void;
  onDeleteActivity?: (dayIdx: number, actIdx: number) => void;
  dayIndex: number;
  hoveredActivityId?: string | null;
  onHoverActivity?: (id: string | null) => void;
  onActiveActivity?: (id: string | null) => void;
}

/**
 * Collapsible day card grouping activities and routing times.
 */
export function DayAccordion({
  dayNumber,
  theme,
  activities,
  isOpen,
  onToggle,
  onEditActivity,
  onDeleteActivity,
  dayIndex,
  hoveredActivityId,
  onHoverActivity,
  onActiveActivity,
}: DayAccordionProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-black/[0.03] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left overflow-hidden relative transition-all duration-300">
      {/* Accordion header button */}
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-black/[0.02]:bg-white/[0.02] transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-4 min-w-0 pr-6">
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold shrink-0 shadow-sm">
            {dayNumber}
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <h4 className="text-base font-semibold text-slate-900 leading-tight truncate tracking-tight">
              {theme}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {activities.length} activities planned
            </p>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Accordion contents drawer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-black/[0.03] p-5 space-y-4 bg-slate-50/50">
              {activities.length === 0 ? (
                <p className="text-sm text-slate-400 italic py-4 text-center select-none font-medium">No stops scheduled for today.</p>
              ) : (
                <div className="space-y-4 relative border-l-2 border-black/[0.06] pl-5 py-2 ml-5 select-none">
                  {(activities ?? []).map((act, idx) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={act.id} 
                      className={`relative rounded-2xl transition-all duration-300 ${hoveredActivityId === act.id ? 'ring-2 ring-indigo-500/50 bg-indigo-50/30' : ''}`}
                    >
                      {/* Timeline indicator node */}
                      <div className={`absolute -left-[27px] top-5 w-2.5 h-2.5 rounded-full shrink-0 ring-4 transition-colors duration-300 ${hoveredActivityId === act.id ? 'bg-indigo-500 ring-indigo-100' : 'bg-slate-900 ring-white'}`} />
                      <ActivityCard
                        title={(act as any).activity || (act as any).title}
                        time={act.time}
                        duration={act.durationMinutes ? `${act.durationMinutes} mins` : (act as any).duration}
                        cost={act.estimatedCost || (act as any).cost}
                        rating={(act as any).rating}
                        category={act.category}
                        image={act.resolvedImage}
                        distance={(act as any).distance}
                        walkingTime={act.travelTimeMinutes ? `${act.travelTimeMinutes} mins transit` : (act as any).walkingTime}
                        weatherBadge={(act as any).weatherBadge}
                        bookingLink={(act as any).bookingLink ?? (act as any).website}
                        recommendationTag={(act as any).recommendationTag ?? (act as any).bestVisitingTime}
                        reviewCount={(act as any).reviewCount}
                        openingHours={(act as any).openingHours}
                        googleMapsUrl={(act as any).googleMapsUrl}
                        aiNotes={(act as any).aiNotes ? (act as any).aiNotes + ((act as any).accessibility ? ` • Accessibility: ${(act as any).accessibility}` : '') + ((act as any).admissionNote ? ` • Note: ${(act as any).admissionNote}` : '') : ((act as any).accessibility || (act as any).admissionNote)}
                        nearbyRestaurants={(act as any).nearbyRestaurants}
                        nearbyAttractions={(act as any).nearbyAttractions}
                        transportAdvice={(act as any).transportAdvice}
                        priceLevel={(act as any).priceLevel}
                        copilotReasoning={(act as any).explainableReasoning || act.copilotReasoning}
                        warnings={act.warnings}
                        onEdit={onEditActivity ? () => onEditActivity(dayIndex, idx) : undefined}
                        onDelete={onDeleteActivity ? () => onDeleteActivity(dayIndex, idx) : undefined}
                        onMouseEnter={() => onHoverActivity?.(act.id || null)}
                        onMouseLeave={() => onHoverActivity?.(null)}
                        onClick={() => onActiveActivity?.(act.id || null)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
