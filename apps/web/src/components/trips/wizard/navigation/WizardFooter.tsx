'use client';

import React from 'react';
import { useWizard } from '../engine/WizardProvider';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

interface WizardFooterProps {
  isValid: boolean;
  onNext?: () => void; // Optional override for step-specific next logic
  isSubmitting?: boolean;
}

export function WizardFooter({ isValid, onNext, isSubmitting = false }: WizardFooterProps) {
  const { currentStep, totalSteps, nextStep, prevStep } = useWizard();
  
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 md:absolute bg-background md:bg-transparent border-t border-white/10 md:border-none p-4 md:p-0 z-10 flex items-center justify-between">
      <button
        type="button"
        onClick={prevStep}
        disabled={currentStep === 0 || isSubmitting}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors",
          currentStep === 0 
            ? "opacity-0 pointer-events-none" 
            : "bg-white/[0.03] text-foreground hover:bg-white/[0.08] border border-white/10"
        )}
      >
        <Icon name="ArrowLeft" size={16} />
        Back
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={!isValid || isSubmitting}
        className={cn(
          "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium transition-all shadow-lg",
          !isValid || isSubmitting
            ? "bg-white/10 text-white/40 cursor-not-allowed"
            : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20"
        )}
      >
        {isSubmitting ? (
          <>
            <Icon name="Loader2" size={16} className="animate-spin" />
            Creating...
          </>
        ) : isLastStep ? (
          <>
            Create Trip
            <Icon name="Check" size={16} />
          </>
        ) : (
          <>
            Next
            <Icon name="ArrowRight" size={16} />
          </>
        )}
      </button>
    </div>
  );
}
