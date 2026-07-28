'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function PlannerEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
        <Icon name="Map" size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">No Trip Plan Generated Yet</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Tell VoyageAI where you want to go, when, and what you like to do. We&apos;ll generate a comprehensive, personalized itinerary.
      </p>
    </div>
  );
}

export function PlannerError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <Icon name="AlertTriangle" size={32} className="text-destructive" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">Generation Failed</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        {message || 'Something went wrong while planning your trip. Please try again.'}
      </p>
    </div>
  );
}
