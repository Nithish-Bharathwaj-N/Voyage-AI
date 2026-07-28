'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { travelersSchema, type TravelersFormData } from '@/lib/trips/validations/wizard.schema';
import { WizardFooter } from '../navigation/WizardFooter';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

export function TravelersStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<TravelersFormData>({
    resolver: zodResolver(travelersSchema),
    defaultValues: {
      adults: formData.adults || 2,
      children: formData.children || 0,
      rooms: formData.rooms || 1,
    },
    mode: 'onChange',
  });

  const adults = watch('adults');
  const children = watch('children');
  const rooms = watch('rooms');

  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  const onSubmit = (data: TravelersFormData) => {
    updateFormData(data);
    nextStep();
  };

  const Counter = ({ 
    label, 
    sublabel, 
    value, 
    field, 
    min, 
    max 
  }: { 
    label: string, 
    sublabel?: string, 
    value: number, 
    field: keyof TravelersFormData, 
    min: number, 
    max: number 
  }) => (
    <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/10 rounded-xl">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setValue(field, Math.max(min, value - 1), { shouldValidate: true })}
          disabled={value <= min}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
            value <= min ? "border-white/5 text-white/20 cursor-not-allowed" : "border-white/20 text-foreground hover:bg-white/10"
          )}
        >
          <Icon name="Minus" size={14} />
        </button>
        <span className="w-4 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => setValue(field, Math.min(max, value + 1), { shouldValidate: true })}
          disabled={value >= max}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
            value >= max ? "border-white/5 text-white/20 cursor-not-allowed" : "border-white/20 text-foreground hover:bg-white/10"
          )}
        >
          <Icon name="Plus" size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Counter 
        label="Adults" 
        sublabel="Ages 13 or above" 
        value={adults} 
        field="adults" 
        min={1} 
        max={20} 
      />
      <Counter 
        label="Children" 
        sublabel="Ages 0-12" 
        value={children} 
        field="children" 
        min={0} 
        max={20} 
      />
      <Counter 
        label="Rooms" 
        value={rooms} 
        field="rooms" 
        min={1} 
        max={10} 
      />

      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
