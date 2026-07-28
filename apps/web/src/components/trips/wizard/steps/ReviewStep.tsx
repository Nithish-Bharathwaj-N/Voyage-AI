'use client';

import React, { useState, useEffect } from 'react';
import { useWizard } from '../engine/WizardProvider';
import { WizardFooter } from '../navigation/WizardFooter';
import { Icon } from '@/components/icons/Icon';
import { cn } from '@/utils/cn';

const Section = ({ title, onEdit, children }: { title: string, onEdit: () => void, children: React.ReactNode }) => (
  <div className="py-4 border-b border-white/10 last:border-0">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <button 
        onClick={onEdit} 
        className="text-xs text-primary hover:text-primary/80 transition-colors"
      >
        Edit
      </button>
    </div>
    <div className="text-sm text-muted-foreground">
      {children}
    </div>
  </div>
);

export function ReviewStep() {
  const { formData, jumpToStep, setStepValidity, currentStep, resetWizard } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Review step is always valid if we reached it
    setStepValidity(currentStep, true);
  }, [currentStep, setStepValidity]);

  const handleCreate = async () => {
    setIsSubmitting(true);
    
    try {
      const { apiClient } = await import('@/lib/api-client');
      // Create trip payload
      const payload = {
        title: `Trip to ${formData.destinations?.[0]?.title || 'Unknown'}`,
        destinationId: formData.destinations?.[0]?.id || 'unknown',
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || new Date().toISOString(),
        budget: formData.bracket?.toUpperCase() || 'MODERATE',
        travelStyle: formData.interests?.[0]?.toUpperCase() || 'LEISURE',
        companions: (formData.adults || 1) + (formData.children || 0),
        notes: formData.interests?.join(', ') || ''
      };
      
      await apiClient.post('/trips', payload);
      
      resetWizard();
      window.location.href = '/trips';
    } catch (e) {
      console.error('Failed to create trip', e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Icon name="Info" size={20} className="text-primary mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-primary">Almost ready!</h4>
          <p className="text-xs text-primary/80 mt-1">Review your selections before we generate your itinerary. You can always change these later in the planner.</p>
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/10 rounded-xl px-4">
        <Section title="Destinations" onEdit={() => jumpToStep(0)}>
          {formData.destinations && formData.destinations.length > 0 ? (
            <ul className="list-disc pl-4 space-y-1">
              {formData.destinations.map(d => (
                <li key={d.id}>{d.title} {d.subtitle ? <span className="opacity-60">({d.subtitle})</span> : ''}</li>
              ))}
            </ul>
          ) : (
            <span className="opacity-50">Not specified</span>
          )}
        </Section>

        <Section title="Dates" onEdit={() => jumpToStep(1)}>
          {formData.startDate && formData.endDate ? (
            <div>
              {formData.startDate} to {formData.endDate}
              {formData.flexibleDates && <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded-full">Flexible</span>}
            </div>
          ) : (
            <span className="opacity-50">Not specified</span>
          )}
        </Section>

        <Section title="Travelers" onEdit={() => jumpToStep(2)}>
          <div className="flex items-center gap-4">
            <span>Adults: <strong>{formData.adults}</strong></span>
            <span>Children: <strong>{formData.children}</strong></span>
            <span>Rooms: <strong>{formData.rooms}</strong></span>
          </div>
        </Section>

        <Section title="Budget" onEdit={() => jumpToStep(3)}>
          {formData.currency} · <span className="capitalize">{formData.bracket}</span>
        </Section>

        <Section title="Preferences" onEdit={() => jumpToStep(4)}>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {formData.interests?.map(i => (
              <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs capitalize">{i}</span>
            ))}
            {formData.accommodation?.map(a => (
              <span key={a} className="px-2 py-1 bg-white/5 rounded text-xs capitalize">{a}</span>
            ))}
            {formData.transportation?.map(t => (
              <span key={t} className="px-2 py-1 bg-white/5 rounded text-xs capitalize">{t}</span>
            ))}
          </div>
        </Section>
      </div>

      <WizardFooter isValid={true} onNext={handleCreate} isSubmitting={isSubmitting} />
    </div>
  );
}
