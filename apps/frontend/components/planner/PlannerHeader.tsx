'use client';

import React from 'react';
import { Sparkles, Loader2, RefreshCw, Check } from 'lucide-react';

interface PlannerHeaderProps {
  hasItinerary: boolean;
  saving: boolean;
  onSave: () => void;
  onReset: () => void;
}

/**
 * Renders the top planner toolbar — status indicator, title, and action buttons.
 */
export function PlannerHeader({ hasItinerary, saving, onSave, onReset }: PlannerHeaderProps) {
  return (
    <div className="h-14 px-5 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-sm shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 leading-none">VoyageAI Planner</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">AI Active</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {hasItinerary && (
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-emerald-500/20"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            {saving ? 'Saving…' : 'Save Trip'}
          </button>
        )}
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Trip</span>
        </button>
      </div>
    </div>
  );
}
