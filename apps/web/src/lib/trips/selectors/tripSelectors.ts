// ============================================================
// Trip Selectors
// Pure functions — no side effects, fully memoizable.
// Components must use these instead of inline filter logic.
// ============================================================

import type {
  WorkspaceTrip,
  TripFilter,
  TripSortKey,
  TripTab,
  TabCounts,
} from '../types/trips.types';

// ─── Tab Pre-filter ──────────────────────────────────────────

export function filterByTab(trips: WorkspaceTrip[], tab: TripTab): WorkspaceTrip[] {
  switch (tab) {
    case 'my-trips':
      return trips.filter((t) => !t.isArchived && !t.isDraft && !t.isTemplate);
    case 'drafts':
      return trips.filter((t) => t.isDraft);
    case 'shared':
      return trips.filter((t) => t.isShared);
    case 'archived':
      return trips.filter((t) => t.isArchived);
    case 'templates':
      return trips.filter((t) => t.isTemplate);
    default:
      return trips;
  }
}

// ─── Attribute Filter ────────────────────────────────────────

export function filterTrips(trips: WorkspaceTrip[], filter: TripFilter): WorkspaceTrip[] {
  return trips.filter((trip) => {
    // Status filter
    if (filter.status && filter.status.length > 0) {
      if (!filter.status.includes(trip.status)) return false;
    }

    // Destination text match
    if (filter.destination && filter.destination.trim()) {
      const q = filter.destination.trim().toLowerCase();
      if (!trip.destinationsLabel.toLowerCase().includes(q)) return false;
    }

    // Budget bracket
    if (filter.budgetBracket && filter.budgetBracket.length > 0) {
      if (!trip.budgetBracket || !filter.budgetBracket.includes(trip.budgetBracket)) return false;
    }

    // Date range
    if (filter.dateRange) {
      const now = new Date();
      const start = new Date(trip.startDate);
      switch (filter.dateRange) {
        case 'future':
          if (start <= now) return false;
          break;
        case 'this-month':
          if (start.getMonth() !== now.getMonth() || start.getFullYear() !== now.getFullYear())
            return false;
          break;
        case 'this-year':
          if (start.getFullYear() !== now.getFullYear()) return false;
          break;
        case 'past':
          if (start >= now) return false;
          break;
      }
    }

    // Travel style
    if (filter.travelStyle && filter.travelStyle.length > 0) {
      if (!trip.travelStyle || !filter.travelStyle.includes(trip.travelStyle)) return false;
    }

    // Favorite
    if (filter.isFavorite !== undefined) {
      if (trip.isFavorite !== filter.isFavorite) return false;
    }

    // Shared
    if (filter.isShared !== undefined) {
      if (trip.isShared !== filter.isShared) return false;
    }

    return true;
  });
}

// ─── Sort ────────────────────────────────────────────────────

export function sortTrips(trips: WorkspaceTrip[], sort: TripSortKey): WorkspaceTrip[] {
  const copy = [...trips];
  switch (sort) {
    case 'newest':
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'oldest':
      return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case 'updated':
      return copy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    case 'alpha':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'budget':
      return copy.sort((a, b) => (b.totalBudget ?? 0) - (a.totalBudget ?? 0));
    case 'duration': {
      const days = (t: WorkspaceTrip) => {
        const diff = new Date(t.endDate).getTime() - new Date(t.startDate).getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
      };
      return copy.sort((a, b) => days(b) - days(a));
    }
    default:
      return copy;
  }
}

// ─── Text Search ─────────────────────────────────────────────

export function searchTrips(trips: WorkspaceTrip[], query: string): WorkspaceTrip[] {
  if (!query.trim()) return trips;
  const q = query.trim().toLowerCase();
  return trips.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.destinationsLabel.toLowerCase().includes(q) ||
      (t.description ?? '').toLowerCase().includes(q)
  );
}

// ─── Tab Counts ──────────────────────────────────────────────

export function getTabCounts(trips: WorkspaceTrip[]): TabCounts {
  return {
    'my-trips': trips.filter((t) => !t.isArchived && !t.isDraft && !t.isTemplate).length,
    drafts: trips.filter((t) => t.isDraft).length,
    shared: trips.filter((t) => t.isShared).length,
    archived: trips.filter((t) => t.isArchived).length,
    templates: trips.filter((t) => t.isTemplate).length,
  };
}
