'use client';

import * as React from 'react';

export function WeatherPanel({ location = "Paris", forecastDays = 5 }: { location?: string, forecastDays?: number }) {
  // This would typically read from TanStack Query via a WeatherEngine integration
  return (
    <div className="p-4 border rounded-xl bg-card shadow-sm space-y-4">
      <h3 className="font-semibold text-sm border-b pb-2">Weather Forecast: {location}</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5].map(day => (
          <div key={day} className="flex flex-col items-center space-y-1 min-w-[60px]">
            <span className="text-xs text-muted-foreground">Day {day}</span>
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              ☀️
            </div>
            <span className="text-xs font-medium">24°C</span>
          </div>
        ))}
      </div>
    </div>
  );
}
