import { z } from 'zod';
import { CreateTripDto } from '@voyageai/types';
import { DateRangeSchema } from '../common';
import { DestinationId, BudgetCategory, TravelStyle } from '@voyageai/types';

export const CreateTripDtoSchema = z.object({
  destinationId: z.string() as z.ZodType<DestinationId>,
  title: z.string().min(1),
  dates: DateRangeSchema,
  budget: z.nativeEnum(BudgetCategory),
  travelStyle: z.nativeEnum(TravelStyle),
}) satisfies z.ZodType<CreateTripDto>;
