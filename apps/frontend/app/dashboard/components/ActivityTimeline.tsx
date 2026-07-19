'use client';

import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  desc: string;
}

interface ActivityTimelineProps {
  events?: TimelineEvent[];
}

const DEFAULT_EVENTS = [
  { id: '1', time: '10:00 AM', title: 'Route Optimization Complete', desc: 'VoyageAI resolved travel times for Tokyo stops.' },
  { id: '2', time: 'Yesterday', title: 'Hotel booking linked', desc: 'Grand Hyatt Tokyo confirmed room checkout dates.' },
  { id: '3', time: '2 days ago', title: 'Packing checklist generated', desc: 'AI parsed local Tokyo forecast to add rain coats.' },
];

/**
 * Activity log timeline details.
 */
export function ActivityTimeline({ events = DEFAULT_EVENTS }: ActivityTimelineProps) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Activity History</h3>

      <div className="relative border-l border-slate-100 pl-4 space-y-4 py-1 ml-2 select-none">
        {events.map((evt) => (
          <div key={evt.id} className="relative space-y-1">
            {/* Timeline node dot */}
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-slate-900 border-2 border-white rounded-full shrink-0" />
            <div className="space-y-0.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">{evt.time}</span>
              <h4 className="text-xs font-extrabold text-slate-900 leading-tight font-display">{evt.title}</h4>
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed pr-2">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
