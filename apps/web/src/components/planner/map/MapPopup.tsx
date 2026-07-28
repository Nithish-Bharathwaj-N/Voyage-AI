"use client";
import React from 'react';
import { Popup } from 'react-map-gl/mapbox';
import { Icon, type IconName } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';

interface MapPopupProps {
  longitude: number;
  latitude: number;
  onClose: () => void;
  title: string;
  subtitle?: string;
  time?: string;
  icon?: IconName;
  iconColorClass?: string;
}

export function MapPopup({
  longitude,
  latitude,
  onClose,
  title,
  subtitle,
  time,
  icon = 'MapPin',
  iconColorClass = 'bg-primary'
}: MapPopupProps) {
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      anchor="bottom"
      onClose={onClose}
      closeButton={false}
      closeOnClick={false}
      className="planner-map-popup z-30"
    >
      <div className="bg-card text-card-foreground rounded-lg shadow-xl border border-border p-3 min-w-[200px] max-w-[280px] relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top color accent strip */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${iconColorClass}`} />

        <div className="flex justify-between items-start gap-2 mb-2 pt-1">
          <div className="flex items-center gap-2">
            <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${iconColorClass} bg-opacity-10 text-primary`}>
              <Icon name={icon} size={12} className={iconColorClass.replace('bg-', 'text-')} />
            </div>
            <span className="font-semibold text-xs text-foreground truncate max-w-[150px]">{title}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 -mr-1 -mt-1 text-muted-foreground hover:text-foreground"
            onClick={onClose}
          >
            <Icon name="X" size={12} />
          </Button>
        </div>

        {subtitle && (
          <p className="text-[11px] text-muted-foreground truncate mb-1 pl-8">
            {subtitle}
          </p>
        )}

        {time && (
          <div className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground pl-8">
            <Icon name="Clock" size={10} />
            <span>{time}</span>
          </div>
        )}
        
      </div>
    </Popup>
  );
}
