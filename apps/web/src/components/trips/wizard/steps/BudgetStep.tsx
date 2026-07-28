'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWizard } from '../engine/WizardProvider';
import { budgetSchema, type BudgetFormData } from '@/lib/trips/validations/wizard.schema';
import { WizardFooter } from '../navigation/WizardFooter';
import { cn } from '@/utils/cn';

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar ($)' },
  { code: 'EUR', label: 'Euro (€)' },
  { code: 'GBP', label: 'British Pound (£)' },
  { code: 'JPY', label: 'Japanese Yen (¥)' },
  { code: 'AUD', label: 'Australian Dollar (A$)' },
  { code: 'CAD', label: 'Canadian Dollar (C$)' },
];

const BRACKETS = [
  { id: 'economy', label: 'Economy', desc: 'Hostels, public transit, street food' },
  { id: 'mid', label: 'Mid-range', desc: '3-4 star hotels, mixed transit, casual dining' },
  { id: 'luxury', label: 'Luxury', desc: '5 star hotels, taxis/rentals, fine dining' },
  { id: 'ultra', label: 'Ultra Luxury', desc: 'Private villas, private drivers, Michelin star' },
];

export function BudgetStep() {
  const { formData, updateFormData, nextStep, setStepValidity, currentStep } = useWizard();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      currency: formData.currency || 'USD',
      bracket: formData.bracket || 'mid',
    },
    mode: 'onChange',
  });

  const currency = watch('currency');
  const bracket = watch('bracket');

  useEffect(() => {
    setStepValidity(currentStep, isValid);
  }, [isValid, currentStep, setStepValidity]);

  const onSubmit = (data: BudgetFormData) => {
    updateFormData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">Currency</label>
        <select
          {...register('currency')}
          className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
        >
          {CURRENCIES.map(c => (
            <option key={c.code} value={c.code} className="bg-background">
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-foreground">Budget Bracket</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRACKETS.map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => setValue('bracket', b.id as BudgetFormData['bracket'], { shouldValidate: true })}
              className={cn(
                "p-4 rounded-xl border text-left transition-all",
                bracket === b.id 
                  ? "bg-primary/10 border-primary shadow-sm shadow-primary/20" 
                  : "bg-white/[0.02] border-white/10 hover:border-white/30"
              )}
            >
              <h3 className={cn("text-sm font-semibold", bracket === b.id ? "text-primary" : "text-foreground")}>
                {b.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {b.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      <WizardFooter isValid={isValid} onNext={handleSubmit(onSubmit)} />
    </form>
  );
}
