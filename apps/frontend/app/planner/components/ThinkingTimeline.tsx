'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

export interface ThinkingStep {
  label: string;
  status: 'pending' | 'active' | 'done';
}

interface ThinkingTimelineProps {
  steps: ThinkingStep[];
  activeStepIndex: number;
}

/**
 * Collapsible progressive checklist detailing AI reasoning steps.
 */
export function ThinkingTimeline({ steps, activeStepIndex }: ThinkingTimelineProps) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-3.5 text-left select-none max-w-sm w-full mx-auto">
      <div className="flex items-center justify-between shrink-0">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reasoning Timeline</span>
        <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          Step {Math.min(activeStepIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      <div className="space-y-2.5">
        {(steps ?? []).map((step, idx) => {
          const isDone = step.status === 'done';
          const isActive = step.status === 'active';

          return (
            <div key={idx} className="flex items-center gap-3">
              {/* Status node icon */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : isActive
                    ? 'border-blue-500 text-blue-500 bg-blue-50/50'
                    : 'border-slate-200 text-slate-300'
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5" />
                ) : isActive ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  isDone
                    ? 'text-slate-550 line-through'
                    : isActive
                    ? 'text-slate-900 font-extrabold'
                    : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
