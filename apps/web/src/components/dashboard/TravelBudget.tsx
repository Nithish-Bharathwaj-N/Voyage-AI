'use client';

import React from 'react';
import { BudgetCard } from '@/components/travel/BudgetCard';
import { Skeleton } from '@/components/ui/Skeleton';

interface TravelBudgetProps {
  limit: number;
  spent: number;
  loading: boolean;
  currency?: string;
}

/**
 * High-density budget gauge panel.
 */
export function TravelBudget({ limit, spent, loading, currency = 'USD' }: TravelBudgetProps) {
  if (loading) {
    return (
      <div className="space-y-4 text-left">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Travel Budget</h3>
        <Skeleton variant="rect" className="h-28" />
      </div>
    );
  }

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Budget Snapshot</h3>
      <BudgetCard limit={limit} spent={spent} currency={currency} className="glow-card" />
    </div>
  );
}
