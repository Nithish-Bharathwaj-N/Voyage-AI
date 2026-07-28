'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { interestsSchema, type InterestsFormData } from '@/lib/trips/validations/wizard.schema';
import { WizardFooter } from '../navigation/WizardFooter';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/icons/Icon';
import type { TravelStyle } from '@/lib/trips/types/trips.types';

const INTERESTS: { id: TravelStyle; label: string; icon: string }[] = [
  { id: 'adventure', label: 'Adventure', icon: 'Mountain' },
  { id: 'culture', label: 'Culture & History', icon: 'Landmark' },
  { id: 'food', label: 'Food & Dining', icon: 'Utensils' },
  { id: 'nightlife', label: 'Nightlife', icon: 'Moon' },
  { id: 'nature', label: 'Nature', icon: 'TreePine' },
  { id: 'luxury', label: 'Luxury', icon: 'Sparkles' },
  { id: 'family', label: 'Family', icon: 'Users' },
  { id: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
  { id: 'relaxation', label: 'Relaxation', icon: 'Coffee' },
  { id: 'romance', label: 'Romance', icon: 'Heart' },
  { id: 'business', label: 'Business', icon: 'Briefcase' },
  { id: 'solo', label: 'Solo', icon: 'User' },
];

export function InterestsStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<InterestsFormData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: formData.interests || [],
    },
    mode: 'onChange',
  });

  const selectedInterests = watch('interests');

  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  const onSubmit = (data: InterestsFormData) => {
    updateFormData(data);
    nextStep();
  };

  const toggleInterest = (id: TravelStyle) => {
    const current = selectedInterests as string[];
    const next = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
    setValue('interests', next as unknown as InterestsFormData['interests'], { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {INTERESTS.map(interest => {
          const isSelected = selectedInterests.includes(interest.id as unknown as "adventure" | "culture" | "food" | "nightlife" | "nature" | "luxury" | "family" | "shopping" | "relaxation" | "romance" | "business" | "solo");
          return (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-3",
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white/[0.02] border-white/10 text-muted-foreground hover:bg-white/[0.05] hover:text-foreground hover:border-white/20"
              )}
            >
              {/* @ts-expect-error - generic icon */}
              <Icon name={interest.icon} size={24} />
              <span className="text-xs font-semibold text-center">{interest.label}</span>
            </button>
          );
        })}
      </div>
      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
