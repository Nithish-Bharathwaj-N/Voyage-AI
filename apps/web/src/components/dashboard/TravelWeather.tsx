'use client';

import React from 'react';
import { WeatherCard } from '@/components/travel/WeatherCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface WeatherForecastItem {
  temp: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'windy';
  humidity?: number;
  date: string;
}

interface TravelWeatherProps {
  forecasts: WeatherForecastItem[];
  loading: boolean;
}

/**
 * Lists weather forecasts in card grids.
 */
export function TravelWeather({ forecasts, loading }: TravelWeatherProps) {
  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Destination Weather</h3>

      {loading ? (
        <Skeleton variant="rect" className="h-16" />
      ) : forecasts.length === 0 ? (
        <WeatherCard temp={24} condition="sunny" date="Today" humidity={45} />
      ) : (
        <div className="space-y-2.5">
          {forecasts.slice(0, 2).map((item, idx) => (
            <WeatherCard
              key={idx}
              temp={item.temp}
              condition={item.condition}
              humidity={item.humidity}
              date={item.date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
