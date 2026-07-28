'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function ProgressCard({ trip }: { trip: WorkspaceTrip }) {
  const p = trip.planningProgress || 0;
  
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="CheckSquare" size={20} className="text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Planning Progress</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Overall Completion</span>
          <span className="font-bold text-foreground">{p}%</span>
        </div>
        
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${p}%` }}
          />
        </div>
      </div>
      
      <div className="mt-6 space-y-3">
        {/* Placeholder milestones */}
        <div className="flex items-center gap-3 text-sm">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="Check" size={12} className="text-primary" />
          </div>
          <span className="text-foreground opacity-80">Dates & Destinations</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="Check" size={12} className="text-primary" />
          </div>
          <span className="text-foreground opacity-80">Travelers & Budget</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          <span className="text-muted-foreground">Book Flights</span>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
          <span className="text-muted-foreground">Book Accommodation</span>
        </div>
      </div>
    </div>
  );
}
