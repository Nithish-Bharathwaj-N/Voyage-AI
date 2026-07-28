import { z } from 'zod';
import type { BudgetBracket, TravelStyle } from '../types/trips.types';

// Step 1: Destination
export const destinationSchema = z.object({
  destinations: z.array(z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    domain: z.string(),
  })).min(1, 'Please select at least one destination.'),
});

// Step 2: Dates
export const datesSchema = z.object({
  startDate: z.string().min(1, 'Start date is required.'),
  endDate: z.string().min(1, 'End date is required.'),
  flexibleDates: z.boolean().default(false),
});

// Step 3: Travelers
export const travelersSchema = z.object({
  adults: z.number().min(1, 'At least 1 adult is required.').max(20),
  children: z.number().min(0).max(20),
  rooms: z.number().min(1, 'At least 1 room is required.').max(10),
});

// Step 4: Budget
export const budgetSchema = z.object({
  currency: z.string().min(1, 'Please select a currency.'),
  bracket: z.enum(['economy', 'mid', 'luxury', 'ultra'] as const, {
    errorMap: () => ({ message: 'Please select a budget bracket.' })
  }),
});

// Step 5: Interests
export const interestsSchema = z.object({
  interests: z.array(z.enum([
    'adventure', 'culture', 'food', 'nightlife', 'nature', 'luxury', 'family', 'shopping', 'relaxation', 'romance', 'business', 'solo'
  ] as const)).min(1, 'Please select at least one interest.'),
});

// Step 6: Accommodation
export const accommodationSchema = z.object({
  accommodation: z.array(z.string()).min(1, 'Please select at least one accommodation type.'),
});

// Step 7: Transportation
export const transportationSchema = z.object({
  transportation: z.array(z.string()).min(1, 'Please select at least one transportation mode.'),
});

// Full Wizard Schema
export const wizardSchema = z.object({
  ...destinationSchema.shape,
  ...datesSchema.shape,
  ...travelersSchema.shape,
  ...budgetSchema.shape,
  ...interestsSchema.shape,
  ...accommodationSchema.shape,
  ...transportationSchema.shape,
});

export type DestinationFormData = z.infer<typeof destinationSchema>;
export type DatesFormData = z.infer<typeof datesSchema>;
export type TravelersFormData = z.infer<typeof travelersSchema>;
export type BudgetFormData = z.infer<typeof budgetSchema>;
export type InterestsFormData = z.infer<typeof interestsSchema>;
export type AccommodationFormData = z.infer<typeof accommodationSchema>;
export type TransportationFormData = z.infer<typeof transportationSchema>;
export type WizardFormData = z.infer<typeof wizardSchema>;

export const defaultWizardValues: Partial<WizardFormData> = {
  destinations: [],
  startDate: '',
  endDate: '',
  flexibleDates: false,
  adults: 2,
  children: 0,
  rooms: 1,
  currency: 'USD',
  bracket: 'mid',
  interests: [],
  accommodation: [],
  transportation: [],
};
