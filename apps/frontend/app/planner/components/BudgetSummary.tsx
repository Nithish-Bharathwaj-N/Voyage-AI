'use client';

import React from 'react';
import { DollarSign, Bed, Utensils, Navigation, Ticket, Sparkles } from 'lucide-react';
import { CanonicalBudget } from '@/types/itinerary';

interface BudgetSummaryProps {
  budget: CanonicalBudget;
}

/**
 * Spent metrics totals wrapper with breakdown.
 */
export function BudgetSummary({ budget }: BudgetSummaryProps) {
  const safeTotal = typeof budget?.total === 'number' ? budget.total : 0;
  const safeCurrency = budget?.currency ?? 'USD';

  return (
    <div className="relative group flex items-center gap-2 py-3 px-4 bg-slate-50 border border-slate-100 rounded-2xl w-fit text-left shrink-0 select-none cursor-help">
      <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
      <div className="space-y-0.5">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Total Cost</span>
        <p className="text-xs font-black text-slate-900 leading-none">
          {Number(safeTotal ?? 0).toLocaleString()} {safeCurrency}
        </p>
      </div>

      {/* Breakdown Tooltip */}
      <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-slate-100 rounded-xl shadow-xl w-48 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 text-xs text-slate-600 space-y-2">
        <div className="flex justify-between items-center pb-2 border-b border-slate-50">
          <span className="font-bold text-slate-900">Budget Breakdown</span>
        </div>
        {budget?.accommodation !== undefined && (
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><Bed className="w-3 h-3 text-slate-400"/> Stays</span><span className="font-semibold">{budget.accommodation} {safeCurrency}</span></div>
        )}
        {budget?.food !== undefined && (
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><Utensils className="w-3 h-3 text-slate-400"/> Food</span><span className="font-semibold">{budget.food} {safeCurrency}</span></div>
        )}
        {budget?.transport !== undefined && (
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><Navigation className="w-3 h-3 text-slate-400"/> Transit</span><span className="font-semibold">{budget.transport} {safeCurrency}</span></div>
        )}
        {budget?.activities !== undefined && (
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><Ticket className="w-3 h-3 text-slate-400"/> Activities</span><span className="font-semibold">{budget.activities} {safeCurrency}</span></div>
        )}
        {budget?.miscellaneous !== undefined && (
          <div className="flex justify-between items-center"><span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-slate-400"/> Misc</span><span className="font-semibold">{budget.miscellaneous} {safeCurrency}</span></div>
        )}
      </div>
    </div>
  );
}
