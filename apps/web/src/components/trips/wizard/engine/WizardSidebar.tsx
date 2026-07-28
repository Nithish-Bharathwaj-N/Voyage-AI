'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useWizard } from './WizardProvider';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

interface SidebarStep {
  title: string;
  description: string;
  index: number;
}

export function WizardSidebar({ steps }: { steps: SidebarStep[] }) {
  const { currentStep, isStepValid, canNavigateTo, jumpToStep } = useWizard();

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-foreground">VoyageAI</h1>
        <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase font-semibold">Trip Planner</p>
      </div>

      <nav className="flex-1 space-y-6">
        {steps.map((step) => {
          const isActive = currentStep === step.index;
          const isCompleted = step.index < currentStep;
          const isValid = isStepValid(step.index);
          const isClickable = canNavigateTo(step.index);

          return (
            <button
              key={step.index}
              type="button"
              onClick={() => jumpToStep(step.index)}
              disabled={!isClickable}
              className={cn(
                "group relative flex flex-col items-start w-full text-left transition-all",
                isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors",
                    isActive 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : isCompleted && isValid
                      ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-500"
                      : "bg-white/5 border-white/10 text-muted-foreground group-hover:border-white/30"
                  )}
                >
                  {isCompleted && isValid ? <Icon name="Check" size={10} /> : step.index + 1}
                </div>
                <span 
                  className={cn(
                    "text-sm font-semibold transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
                  )}
                >
                  {step.title}
                </span>
              </div>
              
              {/* Connector Line */}
              {step.index < steps.length - 1 && (
                <div className="absolute left-3 top-7 bottom-[-24px] w-px bg-white/10 -ml-px" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => window.history.back()}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <Icon name="ArrowLeft" size={12} />
          Exit to Workspace
        </button>
      </div>
    </div>
  );
}
