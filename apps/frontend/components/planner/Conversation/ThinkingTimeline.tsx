'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';
import { ThinkingStep } from '@/app/planner/types/planner';

interface ThinkingTimelineProps {
  steps: ThinkingStep[];
  currentStep: number;
}

/**
 * Renders an animated reasoning step checklist showing AI thought progression.
 */
export function ThinkingTimeline({ steps, currentStep }: ThinkingTimelineProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
        </svg>
      </div>

      <div className="bg-white border border-slate-100 px-4 py-4 rounded-2xl rounded-tl-sm max-w-sm space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
          <span>Building your itinerary…</span>
        </div>

        <div className="space-y-1.5">
          {steps.map((step, i) => (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-2 text-[11px] font-medium"
            >
              <span className="text-base leading-none">{step.icon}</span>
              <span className={i <= currentStep ? 'text-slate-700' : 'text-slate-400'}>
                {step.text}
              </span>
              <span className="ml-auto">
                {i < currentStep && <Check className="w-3 h-3 text-emerald-500" />}
                {i === currentStep && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
