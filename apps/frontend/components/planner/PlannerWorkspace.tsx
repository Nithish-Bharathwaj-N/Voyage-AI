'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Check, Loader2, RefreshCw } from 'lucide-react';
import { Itinerary } from '@/types/itinerary';
import { StopCoordinate } from '@/app/planner/types/planner';
import { TimelinePanel } from './Workspace/TimelinePanel';
import { PlannerMap } from './Map/PlannerMap';

interface PlannerWorkspaceProps {
  itinerary: Itinerary;
  mapCoords: StopCoordinate[];
  mapCenter: { latitude: number; longitude: number };
  budgetTotal: number;
  budgetLimit: number;
  saving: boolean;
  selectedActivityId?: string | null;
  onSave: () => void;
  onReset: () => void;
  onActivityClick?: (id: string) => void;
}

/**
 * Renders the right-side itinerary preview workspace: header meta, timeline split, and map.
 */
export function PlannerWorkspace({
  itinerary,
  mapCoords,
  mapCenter,
  budgetTotal,
  budgetLimit,
  saving,
  selectedActivityId,
  onSave,
  onReset,
  onActivityClick,
}: PlannerWorkspaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:flex flex-1 flex-col bg-slate-50 overflow-hidden"
    >
      {/* Workspace header */}
      <div className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between shrink-0">
        <div className="space-y-0.5">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            Preview Workspace
          </span>
          <h2 className="text-base font-black text-slate-900">{itinerary.destination}</h2>
          <div className="flex items-center gap-3 text-[10px] text-slate-400 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {itinerary.startDate} → {itinerary.endDate}
            </span>
            <span className="flex items-center gap-1 text-emerald-600">
              <DollarSign className="w-3 h-3" />
              {itinerary.currency} {budgetTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase transition-all cursor-pointer shadow-md shadow-emerald-500/15"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            {saving ? 'Saving…' : 'Save & Open'}
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200:bg-slate-700 rounded-xl text-xs font-bold text-slate-600 transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Start Over
          </button>
        </div>
      </div>

      {/* Timeline + Map split */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[400px] border-r border-slate-200 overflow-hidden">
          <TimelinePanel
            days={itinerary.days}
            currency={itinerary.currency}
            budgetTotal={budgetTotal}
            budgetLimit={budgetLimit}
            selectedActivityId={selectedActivityId}
            onActivityClick={onActivityClick}
          />
        </div>
        <div className="flex-1 p-4">
          <PlannerMap coordinates={mapCoords} center={mapCenter} />
        </div>
      </div>
    </motion.div>
  );
}
