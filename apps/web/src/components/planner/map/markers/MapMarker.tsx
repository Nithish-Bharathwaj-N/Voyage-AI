import React from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { Icon, type IconName } from '@/components/icons/Icon';
import type { PlannerActivity } from '@/lib/planner/types/planner.types';

interface MapMarkerProps {
  activity: PlannerActivity;
  longitude: number;
  latitude: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const MARKER_ICONS: Record<string, IconName> = {
  flight: 'Plane',
  hotel: 'Bed',
  restaurant: 'Utensils',
  transport: 'Train',
  activity: 'Camera',
  note: 'StickyNote',
  unknown: 'MapPin',
};

const MARKER_COLORS: Record<string, string> = {
  flight: 'bg-blue-500',
  hotel: 'bg-indigo-500',
  restaurant: 'bg-orange-500',
  transport: 'bg-green-500',
  activity: 'bg-primary',
  note: 'bg-yellow-500',
  unknown: 'bg-muted-foreground',
};

export function MapMarker({
  activity,
  longitude,
  latitude,
  isSelected = false,
  onClick
}: MapMarkerProps) {
  const iconName = MARKER_ICONS[activity.type] || 'MapPin';
  const colorClass = MARKER_COLORS[activity.type] || 'bg-primary';

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor="center"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        onClick?.();
      }}
    >
      <div 
        className={`
          group relative cursor-pointer flex items-center justify-center transition-transform duration-200
          ${isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'}
        `}
      >
        {/* Pulse effect for selected marker */}
        {isSelected && (
          <span className={`absolute inline-flex h-full w-full rounded-full ${colorClass} opacity-75 animate-ping`} />
        )}

        {/* Marker Pill / Pin */}
        <div 
          className={`
            h-8 w-8 rounded-full border-2 border-background shadow-lg flex items-center justify-center text-white
            ${colorClass} ${isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}
          `}
        >
          <Icon name={iconName} size={14} />
        </div>

        {/* Tooltip on hover */}
        <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center pointer-events-none">
          <div className="bg-popover text-popover-foreground text-[10px] font-semibold px-2 py-0.5 rounded shadow-md border whitespace-nowrap">
            {activity.title}
          </div>
          <div className="w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-popover" />
        </div>
      </div>
    </Marker>
  );
}
