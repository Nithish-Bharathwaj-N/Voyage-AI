import React from 'react';
import type { Metadata } from 'next';
import { WizardProvider } from '@/components/trips/wizard/engine/WizardProvider';
import { WizardLayout } from '@/components/trips/wizard/engine/WizardLayout';
import { DestinationStep } from '@/components/trips/wizard/steps/DestinationStep';
import { DatesStep } from '@/components/trips/wizard/steps/DatesStep';
import { TravelersStep } from '@/components/trips/wizard/steps/TravelersStep';
import { BudgetStep } from '@/components/trips/wizard/steps/BudgetStep';
import { InterestsStep } from '@/components/trips/wizard/steps/InterestsStep';
import { AccommodationStep } from '@/components/trips/wizard/steps/AccommodationStep';
import { TransportationStep } from '@/components/trips/wizard/steps/TransportationStep';
import { ReviewStep } from '@/components/trips/wizard/steps/ReviewStep';

export const metadata: Metadata = {
  title: 'Plan a New Trip | VoyageAI',
  description: 'Create a new trip itinerary with VoyageAI.',
};

const WIZARD_STEPS = [
  {
    title: 'Destination',
    description: 'Where do you want to go?',
    component: <DestinationStep />,
  },
  {
    title: 'Dates',
    description: 'When are you traveling?',
    component: <DatesStep />,
  },
  {
    title: 'Travelers',
    description: 'Who is coming with you?',
    component: <TravelersStep />,
  },
  {
    title: 'Budget',
    description: 'What is your budget?',
    component: <BudgetStep />,
  },
  {
    title: 'Interests',
    description: 'What do you want to do?',
    component: <InterestsStep />,
  },
  {
    title: 'Accommodation',
    description: 'Where do you want to stay?',
    component: <AccommodationStep />,
  },
  {
    title: 'Transportation',
    description: 'How do you want to get around?',
    component: <TransportationStep />,
  },
  {
    title: 'Review',
    description: 'Review your trip details',
    component: <ReviewStep />,
  },
];

export default function NewTripWizardPage() {
  return (
    <WizardProvider totalSteps={WIZARD_STEPS.length}>
      <WizardLayout steps={WIZARD_STEPS} />
    </WizardProvider>
  );
}
