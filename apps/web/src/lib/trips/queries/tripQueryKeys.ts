// ============================================================
// Trip Query Keys
// Stable, hierarchical key factories for TanStack Query.
// Mirror the plannerQueryKeys pattern.
// ============================================================

export const tripKeys = {
  all: ['trips-workspace'] as const,

  lists: () => [...tripKeys.all, 'list'] as const,
  list: (tab: string, filter: object, sort: string) =>
    [...tripKeys.lists(), tab, filter, sort] as const,

  details: () => [...tripKeys.all, 'detail'] as const,
  detail: (id: string) => [...tripKeys.details(), id] as const,

  statistics: () => [...tripKeys.all, 'statistics'] as const,
} as const;
