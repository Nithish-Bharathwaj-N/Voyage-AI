'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { accommodationSchema, type AccommodationFormData } from '@/lib/trips/validations/wizard.schema';
import { WizardFooter } from '../navigation/WizardFooter';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/icons/Icon';

const ACCOMMODATIONS = [
  { id: 'hotel', label: 'Hotel', icon: 'Hotel' },
  { id: 'hostel', label: 'Hostel', icon: 'Bed' },
  { id: 'apartment', label: 'Apartment', icon: 'Home' },
  { id: 'resort', label: 'Resort', icon: 'Palmtree' },
  { id: 'camping', label: 'Camping', icon: 'Tent' },
  { id: 'none', label: 'No Preference', icon: 'HelpCircle' },
];

export function AccommodationStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<AccommodationFormData>({
    resolver: zodResolver(accommodationSchema),
    defaultValues: {
      accommodation: formData.accommodation || [],
    },
    mode: 'onChange',
  });

  const selected = watch('accommodation');

  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  const onSubmit = (data: AccommodationFormData) => {
    updateFormData(data);
    nextStep();
  };

  const toggleOption = (id: string) => {
    if (id === 'none') {
      setValue('accommodation', ['none'], { shouldValidate: true });
      return;
    }
    const current = selected.filter(s => s !== 'none');
    const next = current.includes(id) ? current.filter(i => i !== id) : [...current, id];
    setValue('accommodation', next, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {ACCOMMODATIONS.map(opt => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleOption(opt.id)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all text-left",
                isSelected
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-white/[0.02] border-white/10 text-foreground hover:bg-white/[0.05] hover:border-white/20"
              )}
            >
              {/* @ts-expect-error - generic icon */}
              <Icon name={opt.icon} size={20} className={isSelected ? "text-primary" : "text-muted-foreground"} />
              <span className="text-sm font-semibold">{opt.label}</span>
            </button>
          );
        })}
      </div>
      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
