import { z } from 'zod';
import { Trip, User, TripId, UserId, DestinationId, TripStatus, BudgetCategory, TravelStyle } from '@voyageai/types';
import { DateRangeSchema } from '../common';

export const UserSchema = z.object({
  id: z.string() as z.ZodType<UserId>,
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<User>;

export const TripSchema = z.object({
  id: z.string() as z.ZodType<TripId>,
  ownerId: z.string() as z.ZodType<UserId>,
  destinationId: z.string() as z.ZodType<DestinationId>,
  title: z.string().min(1).max(255),
  dates: DateRangeSchema,
  status: z.nativeEnum(TripStatus),
  budget: z.nativeEnum(BudgetCategory),
  travelStyle: z.nativeEnum(TravelStyle),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Trip>;
