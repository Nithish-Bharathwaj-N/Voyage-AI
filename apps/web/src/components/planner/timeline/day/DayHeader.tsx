"use client";
import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { Button } from '@/components/ui/Button';
import type { TimelineDay } from '@/lib/planner/types/planner.types';

export interface DayHeaderProps {
  dayIndex: number;
  day: TimelineDay;
  isExpanded: boolean;
  onToggleExpand: () => void;
  panelId?: string;
}

export function DayHeader({ dayIndex, day, isExpanded, onToggleExpand, panelId }: DayHeaderProps) {
  // Format date, e.g., "Oct 12"
  const dateObj = new Date(day.date);
  const formattedDate = `${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getDate()}`;

  return (
    <div 
      className="sticky top-0 z-20 bg-muted/10 backdrop-blur-md py-4 mb-4 border-b border-border/50 flex items-center justify-between group cursor-pointer"
      onClick={onToggleExpand}
      aria-expanded={isExpanded}
      aria-controls={panelId}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggleExpand();
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
          D{dayIndex + 1}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">{formattedDate} • {day.title}</h2>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </div>
          <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mt-0.5">
            <span className="flex items-center gap-1"><Icon name="MapPin" size={12} /> {day.destination}</span>
            {day.weather && (
              <span className="flex items-center gap-1"><Icon name="CloudSun" size={12} /> {day.weather.temp}° {day.weather.condition}</span>
            )}
            {day.budget && (
              <span className="flex items-center gap-1"><Icon name="Wallet" size={12} /> ${day.budget.spent.toLocaleString()} / ${day.budget.allocated.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()} aria-label="Add activity to day">
          <Icon name="Plus" size={16} />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()} aria-label="Day options">
          <Icon name="MoreHorizontal" size={16} />
        </Button>
      </div>
    </div>
  );
}
