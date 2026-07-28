'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';

export function AchievementsCard() {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-500/10 rounded-xl">
          <Icon name="Award" size={24} className="text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
      </div>
      
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
        <Icon name="Lock" size={32} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">Coming Soon</h3>
        <p className="text-muted-foreground max-w-xs text-sm">
          Achievements and badges will be available in a future update. Keep traveling!
        </p>
      </div>
    </div>
  );
}
