'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar } from 'lucide-react';
import { DayPlan } from '@/types/itinerary';
import { ActivityCard } from './ActivityCard';

interface DayCardProps {
  day: DayPlan;
  index: number;
  selectedActivityId?: string | null;
  onActivityClick?: (id: string) => void;
}

const DAY_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-orange-500 to-rose-500',
  'from-pink-500 to-fuchsia-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-blue-600',
];

/**
 * Renders a collapsible day card showing theme, weather notes, and activity list.
 */
export function DayCard({ day, index, selectedActivityId, onActivityClick }: DayCardProps) {
  const [open, setOpen] = React.useState(index === 0);
  const color = DAY_COLORS[index % DAY_COLORS.length];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-slate-50:bg-slate-800/50 transition-colors"
      >
        <div className={`w-9 h-9 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
          <span className="text-white text-xs font-black">{day.dayNumber}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-slate-900 truncate">{day.theme}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar className="w-3 h-3 text-slate-400" />
            <span className="text-[10px] text-slate-400 font-semibold">{day.date}</span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] text-slate-400 font-medium">{day.activities.length} stops</span>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {day.weatherNotes && (
                <p className="text-[10px] text-slate-400 italic font-medium px-1">{day.weatherNotes}</p>
              )}
              {day.activities.map((act, i) => (
                <ActivityCard
                  key={`${day.dayNumber}-${i}`}
                  activity={act}
                  isSelected={selectedActivityId === `${day.dayNumber}-${i}`}
                  onClick={() => onActivityClick?.(`${day.dayNumber}-${i}`)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
