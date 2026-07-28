'use client';

import React from 'react';
import { Icon } from '@/components/icons/Icon';
import type { WorkspaceTrip } from '@/lib/trips/types/trips.types';

export function BudgetOverviewCard({ trip }: { trip: WorkspaceTrip }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-white/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Icon name="Wallet" size={20} className="text-emerald-500" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Est. Budget</h3>
        <p className="text-xl font-bold text-foreground mt-1">
          {trip.totalBudget ? `$${trip.totalBudget.toLocaleString()}` : 'Not set'}
        </p>
        
        <div className="flex items-center gap-2 mt-4 text-xs font-medium text-muted-foreground capitalize">
          <Icon name="TrendingUp" size={14} />
          {trip.budgetBracket || 'Flexible'} Bracket
        </div>
      </div>
    </div>
  );
}
