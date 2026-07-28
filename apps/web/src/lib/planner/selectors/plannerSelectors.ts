// ============================================================
// Planner Selectors
// Pure functions for deriving computed data from raw query results.
// Use useMemo() in components when calling these.
// ============================================================

import type {
  Itinerary,
  TimelineDay,
  TimelineSection,
  PlannerActivity,
  PlannerSummary,
  Trip,
} from '../types/planner.types';

// ─── Day Selectors ────────────────────────────────────────────

export function getDayById(itinerary: Itinerary | undefined, dayId: string): TimelineDay | undefined {
  return itinerary?.days.find((d) => d.id === dayId);
}

export function getActivitiesByDay(itinerary: Itinerary, dayId: string): PlannerActivity[] {
  const day = itinerary.days.find((d) => d.id === dayId);
  return day?.sections.flatMap((s) => s.activities) ?? [];
}

// ─── Section Selectors ────────────────────────────────────────

export function getSectionById(
  day: TimelineDay | undefined,
  sectionId: string
): TimelineSection | undefined {
  return day?.sections.find((s) => s.id === sectionId);
}

export function getActivitiesBySection(
  day: TimelineDay | undefined,
  sectionId: string
): PlannerActivity[] {
  const section = day?.sections.find((s) => s.id === sectionId);
  return section?.activities ?? [];
}

// ─── Activity Selectors ───────────────────────────────────────

export function getAllActivities(itinerary: Itinerary): PlannerActivity[] {
  return itinerary.days.flatMap((d) => d.sections.flatMap((s) => s.activities));
}

export function getSelectedActivities(
  itinerary: Itinerary,
  selectedIds: string[]
): PlannerActivity[] {
  if (selectedIds.length === 0) return [];
  const all = getAllActivities(itinerary);
  return all.filter((a) => selectedIds.includes(a.id));
}

export function getVisibleActivities(
  itinerary: Itinerary,
  typeFilter: string
): PlannerActivity[] {
  const all = getAllActivities(itinerary);
  if (typeFilter === 'all') return all;
  return all.filter((a) => a.type === typeFilter);
}

export function getActivitiesWithCoordinates(
  itinerary: Itinerary
): PlannerActivity[] {
  return getAllActivities(itinerary).filter((a) => Boolean(a.coordinates));
}

// ─── Summary Selectors ────────────────────────────────────────

export function getTripSummary(
  trip: Trip,
  itinerary: Itinerary
): PlannerSummary {
  const allActivities = getAllActivities(itinerary);
  const completed = allActivities.filter((a) => a.completed).length;
  const budgetSpent = itinerary.days.reduce((sum, d) => sum + (d.budget?.spent ?? 0), 0);
  const budgetAllocated = itinerary.days.reduce((sum, d) => sum + (d.budget?.allocated ?? 0), 0);

  return {
    trip,
    itinerary,
    totalDays: itinerary.days.length,
    totalActivities: allActivities.length,
    completedActivities: completed,
    budgetSpent,
    budgetAllocated,
  };
}

// Placeholder — will be replaced when weather API is integrated
export function getWeatherSummary(itinerary: Itinerary) {
  return itinerary.days
    .filter((d) => Boolean(d.weather))
    .map((d) => ({ dayId: d.id, date: d.date, weather: d.weather }));
}

// Placeholder — will be replaced when budget engine is integrated
export function getBudgetSummary(itinerary: Itinerary) {
  const spent = itinerary.days.reduce((s, d) => s + (d.budget?.spent ?? 0), 0);
  const allocated = itinerary.days.reduce((s, d) => s + (d.budget?.allocated ?? 0), 0);
  return { spent, allocated, remaining: allocated - spent };
}
