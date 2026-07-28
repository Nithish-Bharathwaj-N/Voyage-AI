'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardProvider';
import { Icon } from '@/components/icons/Icon';

export function WizardProgress({ steps }: { steps: string[] }) {
  const { currentStep, totalSteps } = useWizard();
  
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="bg-background border-b border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => window.history.back()}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <Icon name="ArrowLeft" size={14} />
        </button>
        <span className="text-xs font-semibold text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <div className="w-8 h-8" /> {/* Spacer */}
      </div>
      
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      
      <div className="mt-2 text-center text-sm font-semibold text-foreground">
        {steps[currentStep]}
      </div>
    </div>
  );
}
