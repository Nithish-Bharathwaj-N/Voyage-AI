'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function PlannerHeader() {
  return (
    <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon name="Sparkles" size={16} className="text-primary" />
        </div>
        <h2 className="font-semibold text-foreground">VoyageAI Trip Planner</h2>
      </div>
      
      <div className="flex gap-2">
        <button className="px-4 py-2 text-sm font-medium border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
          Export
        </button>
        <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          Save Trip
        </button>
      </div>
    </header>
  );
}
