'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { datesSchema, type DatesFormData } from '@/lib/trips/validations/wizard.schema';
import { WizardFooter } from '../navigation/WizardFooter';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

export function DatesStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid, errors },
  } = useForm<DatesFormData>({
    resolver: zodResolver(datesSchema),
    defaultValues: {
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
      flexibleDates: formData.flexibleDates || false,
    },
    mode: 'onChange',
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const flexibleDates = watch('flexibleDates');

  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  const onSubmit = (data: DatesFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Departure</label>
          <div className="relative">
            <Icon name="Calendar" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              {...register('startDate')}
              className={cn(
                "w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border rounded-xl text-foreground focus:outline-none focus:ring-2",
                errors.startDate ? "border-rose-500/50 focus:ring-rose-500/50" : "border-white/10 focus:ring-primary"
              )}
            />
          </div>
          {errors.startDate && <p className="text-xs text-rose-400">{errors.startDate.message}</p>}
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Return</label>
          <div className="relative">
            <Icon name="Calendar" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="date"
              {...register('endDate')}
              min={startDate}
              className={cn(
                "w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border rounded-xl text-foreground focus:outline-none focus:ring-2",
                errors.endDate ? "border-rose-500/50 focus:ring-rose-500/50" : "border-white/10 focus:ring-primary"
              )}
            />
          </div>
          {errors.endDate && <p className="text-xs text-rose-400">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* Flexible Dates Toggle */}
      <button
        type="button"
        onClick={() => {
          setValue('flexibleDates', !flexibleDates, { shouldValidate: true });
        }}
        className={cn(
          "flex items-center gap-3 p-4 rounded-xl border transition-colors w-full text-left",
          flexibleDates ? "bg-primary/10 border-primary/30" : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
        )}
      >
        <div className={cn(
          "w-5 h-5 rounded flex items-center justify-center border",
          flexibleDates ? "bg-primary border-primary" : "border-white/20"
        )}>
          {flexibleDates && <Icon name="Check" size={12} className="text-primary-foreground" />}
        </div>
        <div>
          <p className={cn("text-sm font-semibold", flexibleDates ? "text-primary" : "text-foreground")}>
            My dates are flexible
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            I can travel a few days before or after these dates.
          </p>
        </div>
      </button>

      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
