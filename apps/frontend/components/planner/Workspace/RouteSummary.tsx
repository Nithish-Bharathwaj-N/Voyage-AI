'use client';

import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

interface RouteSummaryProps {
  totalDays: number;
  totalStops: number;
  estimatedHours?: number;
}

/**
 * Renders a concise route overview bar showing days, stops, and estimated travel hours.
 */
export function RouteSummary({ totalDays, totalStops, estimatedHours }: RouteSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Route Summary</p>

      <div className="flex items-center justify-between gap-2">
        <div className="text-center">
          <p className="text-xl font-black text-slate-900">{totalDays}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Days</p>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-300" />

        <div className="text-center">
          <p className="text-xl font-black text-slate-900">{totalStops}</p>
          <p className="text-[10px] text-slate-400 font-semibold">Stops</p>
        </div>

        {estimatedHours !== undefined && (
          <>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <p className="text-xl font-black text-slate-900">{estimatedHours}h</p>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold">Travel</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
