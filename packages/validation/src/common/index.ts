import { z } from 'zod';
import {
  CurrencyCode,
  ISODate,
  Latitude,
  Longitude,
  Money,
  Coordinates,
  DateRange,
} from '@voyageai/types';

export const zLatitude = z.number().min(-90).max(90) as z.ZodType<Latitude>;
export const zLongitude = z.number().min(-180).max(180) as z.ZodType<Longitude>;

export const CoordinatesSchema = z.object({
  latitude: zLatitude,
  longitude: zLongitude,
}) satisfies z.ZodType<Coordinates>;

export const zCurrencyCode = z.string().length(3) as z.ZodType<CurrencyCode>;

export const MoneySchema = z.object({
  amountInCents: z.number().int().nonnegative(),
  currency: zCurrencyCode,
}) satisfies z.ZodType<Money>;

export const zISODate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/) as z.ZodType<ISODate>;

export const DateRangeSchema = z.object({
  startDate: zISODate,
  endDate: zISODate,
}) satisfies z.ZodType<DateRange>;
