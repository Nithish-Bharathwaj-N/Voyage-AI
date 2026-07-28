// ============================================================
// Trips Workspace Types
// Extends planner.types.ts for the Trips workspace.
// Components must NOT define their own trip shapes.
// ============================================================

import type { Trip, TripStatus, Destination } from '@/lib/planner/types/planner.types';

// Re-export for convenience
export type { Trip, TripStatus, Destination };

// ─── Workspace Enumerations ──────────────────────────────────

export type TripTab =
  | 'my-trips'
  | 'drafts'
  | 'shared'
  | 'archived'
  | 'templates';

export type TripViewMode = 'grid' | 'list' | 'timeline';

export type TripSortKey =
  | 'newest'
  | 'oldest'
  | 'updated'
  | 'alpha'
  | 'budget'
  | 'duration';

export type TripCardVariant =
  | 'standard'
  | 'featured'
  | 'compact'
  | 'list'
  | 'timeline'
  | 'template';

export type BudgetBracket = 'economy' | 'mid' | 'luxury' | 'ultra';

export type TravelStyle =
  | 'adventure'
  | 'relaxation'
  | 'culture'
  | 'food'
  | 'romance'
  | 'family'
  | 'business'
  | 'solo'
  | 'nightlife'
  | 'nature'
  | 'luxury'
  | 'shopping';

// ─── Workspace Trip ──────────────────────────────────────────
// Extends base Trip with UI-specific derived fields

export interface WeatherPreview {
  condition: string;
  tempC: number;
  icon: string;
}

export interface SharedUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface WorkspaceTrip extends Trip {
  // Planning progress (0–100)
  planningProgress: number;
  // Number of travelers including the owner
  travelerCount: number;
  // Weather at the primary destination
  weatherPreview?: WeatherPreview;
  // Users this trip is shared with
  sharedWith?: SharedUser[];
  // Workspace flags
  isFavorite: boolean;
  isTemplate: boolean;
  isDraft: boolean;
  isArchived: boolean;
  isShared: boolean;
  // Travel tagging
  travelStyle?: TravelStyle;
  // Budget bracket derived from totalBudget
  budgetBracket?: BudgetBracket;
  // Human-readable duration (e.g. "14 days")
  durationLabel: string;
  // Primary destination label (e.g. "Tokyo, Japan")
  primaryDestination: string;
  // All destinations as single string for search
  destinationsLabel: string;
}

// ─── Filter Shape ────────────────────────────────────────────

export interface TripFilter {
  status?: TripStatus[];
  destination?: string;
  budgetBracket?: BudgetBracket[];
  dateRange?: 'future' | 'this-month' | 'this-year' | 'past';
  travelStyle?: TravelStyle[];
  isFavorite?: boolean;
  isShared?: boolean;
}

// ─── Statistics ──────────────────────────────────────────────

export interface TripStatistics {
  total: number;
  active: number;
  upcoming: number;
  drafts: number;
  completed: number;
  shared: number;
}

// ─── Tab Counts ──────────────────────────────────────────────

export interface TabCounts {
  'my-trips': number;
  drafts: number;
  shared: number;
  archived: number;
  templates: number;
}

// ─── Quick Action ────────────────────────────────────────────

export type TripQuickAction =
  | 'view'
  | 'edit'
  | 'duplicate'
  | 'archive'
  | 'delete'
  | 'share'
  | 'favorite'
  | 'export';
