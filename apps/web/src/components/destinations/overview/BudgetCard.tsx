'use client';

import React from 'react';
import type { DetailedDestination } from '@/lib/destinations/types/destination.types';
import { Icon } from '@/components/icons/Icon';

export function BudgetCard({ destination }: { destination: DetailedDestination }) {
  return (
    <div className="bg-card border border-white/10 rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-500/10 rounded-xl">
          <Icon name="Wallet" size={20} className="text-emerald-500" />
        </div>
        <h3 className="font-semibold text-foreground">Budget Estimate</h3>
      </div>
      
      <div className="flex items-end gap-2 mb-2">
        <span className="text-3xl font-bold text-foreground">
          {destination.budget.estimatePerDay}
        </span>
        <span className="text-muted-foreground font-medium mb-1">
          {destination.budget.currency} / day
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{destination.budget.label} expenses</p>
    </div>
  );
}
