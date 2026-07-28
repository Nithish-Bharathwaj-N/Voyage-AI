"use client";
import React from 'react';
import { Icon } from '@/components/icons/Icon';

interface PlannerDragOverlayProps {
  activeId: string;
}

export function PlannerDragOverlay({ activeId }: PlannerDragOverlayProps) {
  // In a real application, we would look up the exact activity data by ID
  // For this UI mockup, we render a generic premium drag shadow
  
  return (
    <div className="flex gap-4 relative z-50">
      <div className="w-10 pt-3 flex-col items-center shrink-0 hidden sm:flex">
        <div className="h-2 w-2 rounded-full bg-primary ring-4 ring-background shadow-lg" />
      </div>
      
      <div className="flex-1 min-w-[300px] rounded-lg border-2 border-primary bg-card/90 backdrop-blur shadow-2xl scale-105 opacity-90 cursor-grabbing relative overflow-hidden flex items-center p-4">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mr-4">
          <Icon name="Move" size={16} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-sm text-foreground">Moving Activity...</h4>
          <p className="text-xs text-muted-foreground">{activeId}</p>
        </div>
      </div>
    </div>
  );
}
