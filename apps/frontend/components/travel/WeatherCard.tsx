'use client';

import React from 'react';
import { Sun, CloudRain, Cloud, CloudSnow, Wind } from 'lucide-react';
import { Card } from '../ui/Card';

export interface WeatherCardProps {
  temp: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'windy';
  humidity?: number;
  date: string;
  className?: string;
}

/**
 * Reusable weather forecast summary card.
 */
export function WeatherCard({ temp, condition, humidity, date, className = '' }: WeatherCardProps) {
  const icons = {
    sunny: <Sun className="w-5 h-5 text-amber-500" />,
    rainy: <CloudRain className="w-5 h-5 text-blue-500" />,
    cloudy: <Cloud className="w-5 h-5 text-slate-400" />,
    snowy: <CloudSnow className="w-5 h-5 text-sky-300" />,
    windy: <Wind className="w-5 h-5 text-teal-400" />,
  };

  return (
    <Card className={`p-3 flex items-center justify-between text-left ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
          {icons[condition]}
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] font-black text-slate-900 leading-none">{date}</p>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{condition}</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="text-sm font-black text-slate-900 leading-none">{temp}°C</span>
        {humidity !== undefined && (
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{humidity}% hum.</p>
        )}
      </div>
    </Card>
  );
}
