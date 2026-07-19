'use client';

import React from 'react';
import { DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

interface BudgetCardProps {
  currency: string;
  total: number;
  limit: number;
}

/**
 * Renders a budget summary with a visual progress bar and over/under-budget indicator.
 */
export function BudgetCard({ currency, total, limit }: BudgetCardProps) {
  const percentage = limit > 0 ? Math.min((total / limit) * 100, 100) : 0;
  const isOver = total > limit && limit > 0;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Budget</span>
        </div>
        {isOver ? (
          <span className="flex items-center gap-1 text-[10px] font-bold text-red-500">
            <AlertTriangle className="w-3 h-3" /> Over budget
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
            <TrendingUp className="w-3 h-3" /> On track
          </span>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-end justify-between">
          <span className="text-xl font-black text-slate-900">
            {currency} {total.toLocaleString()}
          </span>
          {limit > 0 && (
            <span className="text-[10px] text-slate-400 font-semibold">
              of {currency} {limit.toLocaleString()} limit
            </span>
          )}
        </div>

        {limit > 0 && (
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
