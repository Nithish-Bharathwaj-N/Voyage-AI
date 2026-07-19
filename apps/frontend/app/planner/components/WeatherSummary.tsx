'use client';

import React from 'react';
import { Sun, CloudSun, CloudRain } from 'lucide-react';

interface WeatherSummaryProps {
  temp: number;
  condition: string;
}

/**
 * Presentational weather stats helper.
 */
export function WeatherSummary({ temp, condition }: WeatherSummaryProps) {
  const safeCondition = condition ?? '';
  const isRain = safeCondition.toLowerCase().includes('rain');

  return (
    <div className="flex items-center gap-2.5 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit text-left shrink-0 select-none">
      {isRain ? (
        <CloudRain className="w-4 h-4 text-blue-500 shrink-0" />
      ) : (
        <CloudSun className="w-4 h-4 text-amber-500 shrink-0" />
      )}
      <div className="space-y-0.5">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Forecast</span>
        <p className="text-xs font-black text-slate-900 leading-none">
          {temp}°C, {condition}
        </p>
      </div>
    </div>
  );
}
