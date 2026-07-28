'use client';

import React from 'react';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface TripCardProps {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  costEstimate?: number;
  image?: string;
  status?: 'upcoming' | 'ongoing' | 'past';
  onClick?: () => void;
  className?: string;
}

/**
 * Premium trip summary card featuring dates, status indicators, and cost estimations.
 */
export function TripCard({
  title,
  destination,
  startDate,
  endDate,
  costEstimate,
  image,
  status = 'upcoming',
  onClick,
  className = '',
}: TripCardProps) {
  const statusColors = {
    upcoming: 'info' as const,
    ongoing: 'success' as const,
    past: 'default' as const,
  };

  return (
    <Card
      onClick={onClick}
      className={`group cursor-pointer hover:shadow-md hover:border-slate-200:border-slate-700/60 flex flex-col md:flex-row gap-5 p-4 ${className}`}
    >
      {/* Visual Cover Picture */}
      <div className="w-full md:w-36 h-28 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative">
        {image ? (
          <img
            src={image}
            alt={destination}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <MapPin className="w-6 h-6" />
          </div>
        )}
        <div className="absolute top-2.5 left-2.5 z-10">
          <Badge variant={statusColors[status]}>{status}</Badge>
        </div>
      </div>

      {/* Meta Text Details */}
      <div className="flex-1 flex flex-col justify-between py-1 text-left">
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-slate-900 font-display leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{destination}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap pt-3 md:pt-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{startDate} &mdash; {endDate}</span>
          </div>
          {costEstimate && (
            <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>{costEstimate.toLocaleString()} est.</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
