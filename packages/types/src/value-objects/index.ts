import {
  CurrencyCode,
  ImageURL,
  ISODate,
  ISODateTime,
  Latitude,
  Longitude,
  Timezone,
  URL,
} from '../primitives';
import { WeatherCondition } from '../enums';

export interface Coordinates {
  readonly latitude: Latitude;
  readonly longitude: Longitude;
}

export interface GeoPoint {
  readonly type: 'Point';
  readonly coordinates: [Longitude, Latitude]; // GeoJSON standard
}

export interface Address {
  readonly streetLine1?: string;
  readonly streetLine2?: string;
  readonly city: string;
  readonly stateRegion?: string;
  readonly country: string;
  readonly postalCode?: string;
}

export interface DateRange {
  readonly startDate: ISODate;
  readonly endDate: ISODate;
}

export interface TimeRange {
  readonly startTime: string; // e.g. "09:00"
  readonly endTime: string;   // e.g. "17:00"
}

export interface Duration {
  readonly value: number;
  readonly unit: 'MINUTES' | 'HOURS' | 'DAYS';
}

export interface Distance {
  readonly value: number;
  readonly unit: 'METERS' | 'KILOMETERS' | 'MILES';
}

export interface OperatingHours {
  readonly timezone: Timezone;
  readonly schedule: Record<
    'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY',
    TimeRange[]
  >;
}

export interface Rating {
  readonly score: number;
  readonly maxScore: number;
  readonly reviewCount: number;
}

export interface Money {
  readonly amountInCents: number;
  readonly currency: CurrencyCode;
}

export interface BudgetRange {
  readonly min: Money;
  readonly max: Money;
}

export interface ImageReference {
  readonly url: ImageURL;
  readonly altText: string;
  readonly provider?: string;
  readonly photographer?: string;
}

export interface WeatherSnapshot {
  readonly condition: WeatherCondition;
  readonly tempMinC: number;
  readonly tempMaxC: number;
  readonly precipitationChance: number;
  readonly date: ISODate;
}

export interface ContactInformation {
  readonly phone?: string;
  readonly email?: string;
  readonly website?: URL;
}
