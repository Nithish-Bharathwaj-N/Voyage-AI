'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { WizardFormData } from '@/lib/trips/validations/wizard.schema';
import { defaultWizardValues } from '@/lib/trips/validations/wizard.schema';

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  formData: Partial<WizardFormData>;
  updateFormData: (data: Partial<WizardFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  jumpToStep: (step: number) => void;
  isStepValid: (step: number) => boolean;
  setStepValidity: (step: number, isValid: boolean) => void;
  resetWizard: () => void;
  canNavigateTo: (step: number) => boolean;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'voyage-trip-wizard-autosave';

export function WizardProvider({ children, totalSteps }: { children: React.ReactNode; totalSteps: number }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<WizardFormData>>(defaultWizardValues);
  const [stepValidity, setStepValidityMap] = useState<Record<number, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Load autosave on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.formData) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFormData(parsed.formData);
        }
        if (typeof parsed.currentStep === 'number') {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setCurrentStep(parsed.currentStep);
        }
        if (parsed.stepValidity) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setStepValidityMap(parsed.stepValidity);
        }
      }
    } catch (e) {
      console.warn('Failed to load wizard autosave', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Autosave when data changes
  useEffect(() => {
    if (!isInitialized) return;
    const saveState = {
      formData,
      currentStep,
      stepValidity,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saveState));
  }, [formData, currentStep, stepValidity, isInitialized]);

  const updateFormData = useCallback((data: Partial<WizardFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const setStepValidity = useCallback((step: number, isValid: boolean) => {
    setStepValidityMap((prev) => ({ ...prev, [step]: isValid }));
  }, []);

  const isStepValid = useCallback((step: number) => {
    return !!stepValidity[step];
  }, [stepValidity]);

  const canNavigateTo = useCallback((step: number) => {
    if (step === currentStep) return true;
    if (step < currentStep) return true; // Can always go back
    
    // Can only go forward if all previous steps are valid
    for (let i = 0; i < step; i++) {
      if (!stepValidity[i]) return false;
    }
    return true;
  }, [currentStep, stepValidity]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1 && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps, isStepValid]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const jumpToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps && canNavigateTo(step)) {
      setCurrentStep(step);
    }
  }, [totalSteps, canNavigateTo]);

  const resetWizard = useCallback(() => {
    setFormData(defaultWizardValues);
    setCurrentStep(0);
    setStepValidityMap({});
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({
    currentStep,
    totalSteps,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    jumpToStep,
    isStepValid,
    setStepValidity,
    resetWizard,
    canNavigateTo,
  }), [currentStep, totalSteps, formData, updateFormData, nextStep, prevStep, jumpToStep, isStepValid, setStepValidity, resetWizard, canNavigateTo]);

  if (!isInitialized) return null; // Avoid hydration mismatch

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
