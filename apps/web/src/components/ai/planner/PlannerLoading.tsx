'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function PlannerLoading() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 relative mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Sparkles" size={20} className="text-primary animate-pulse" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">Crafting your perfect trip</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Analyzing millions of data points to build a personalized, day-by-day itinerary tailored to your unique travel style...
      </p>
    </div>
  );
}
