'use client';

import React from 'react';
import { DollarSign } from 'lucide-react';
import { Card } from '../ui/Card';
import { Progress } from '../ui/Progress';

export interface BudgetCardProps {
  limit: number;
  spent: number;
  currency?: string;
  className?: string;
}

/**
 * Visual budget progress gauge card.
 */
export function BudgetCard({ limit, spent, currency = 'USD', className = '' }: BudgetCardProps) {
  const percentage = limit > 0 ? (spent / limit) * 100 : 0;
  const isOver = spent > limit;

  return (
    <Card className={`p-4 space-y-3.5 text-left ${className}`}>
      <div className="flex items-center justify-between shrink-0">
        <div className="space-y-0.5">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trip Budget</span>
          <div className="flex items-center text-slate-900">
            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-lg font-black leading-none">{spent.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-bold ml-1.5">/ {limit.toLocaleString()} {currency}</span>
          </div>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
          isOver ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
        }`}>
          {Math.round(percentage)}%
        </div>
      </div>

      <Progress value={spent} max={limit} />

      {isOver && (
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider pl-0.5 select-none">
          ⚠️ Budget limit exceeded
        </p>
      )}
    </Card>
  );
}
