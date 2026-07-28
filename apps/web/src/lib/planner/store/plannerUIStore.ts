// ============================================================
// Planner UI Store (Zustand)
// Owns ONLY transient UI state — never duplicates server data.
// TanStack Query owns all server/remote data.
//
// Key responsibilities:
//  - Selected activity IDs (for Timeline highlighting)
//  - Active map selection (for map marker highlight)
//  - Expanded day IDs (collapse/expand)
//  - Timeline zoom level
//  - Active filters / sort
//  - Timeline ↔ Map synchronization
// ============================================================

import { create } from 'zustand';

// ─── Types ────────────────────────────────────────────────────

type TimelineZoom = 'compact' | 'comfortable' | 'detailed';
type SortOrder = 'time-asc' | 'time-desc' | 'priority';
type ActivityTypeFilter = 'all' | 'flight' | 'hotel' | 'restaurant' | 'activity' | 'transport' | 'note';

interface PlannerUIState {
  // Selection (Timeline)
  selectedActivityIds: string[];
  
  // Map synchronization
  activeMapActivityId: string | null;  // Activity whose marker should be highlighted on the map
  
  // Day panel expand/collapse
  expandedDayIds: string[];
  
  // Timeline controls
  timelineZoom: TimelineZoom;
  sortOrder: SortOrder;
  typeFilter: ActivityTypeFilter;
  
  // Map viewport
  mapViewport: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
}

interface PlannerUIActions {
  // Selection
  selectActivity: (id: string) => void;
  toggleActivitySelection: (id: string, multi?: boolean) => void;
  selectActivitiesRange: (fromId: string, toId: string, allIds: string[]) => void;
  clearSelection: () => void;

  // Map sync — called when user interacts with Timeline or Map
  setActiveMapActivity: (id: string | null) => void;

  // Day panel
  toggleDayExpanded: (dayId: string) => void;
  expandAllDays: (dayIds: string[]) => void;
  collapseAllDays: () => void;

  // Timeline controls
  setTimelineZoom: (zoom: TimelineZoom) => void;
  setSortOrder: (order: SortOrder) => void;
  setTypeFilter: (filter: ActivityTypeFilter) => void;

  // Map
  setMapViewport: (viewport: PlannerUIState['mapViewport']) => void;
}

type PlannerUIStore = PlannerUIState & PlannerUIActions;

// ─── Store ────────────────────────────────────────────────────

export const usePlannerUIStore = create<PlannerUIStore>((set, get) => ({
  // Initial state
  selectedActivityIds: [],
  activeMapActivityId: null,
  expandedDayIds: [],
  timelineZoom: 'comfortable',
  sortOrder: 'time-asc',
  typeFilter: 'all',
  mapViewport: {
    longitude: 139.732,
    latitude: 35.68,
    zoom: 11,
  },

  // ─── Selection Actions ──────────────────────────────────────

  selectActivity: (id) =>
    set({ selectedActivityIds: [id], activeMapActivityId: id }),

  toggleActivitySelection: (id, multi = false) =>
    set((state) => {
      const isSelected = state.selectedActivityIds.includes(id);
      const selectedActivityIds = multi
        ? isSelected
          ? state.selectedActivityIds.filter((x) => x !== id)
          : [...state.selectedActivityIds, id]
        : [id];

      return {
        selectedActivityIds,
        // When single-selecting, sync to map
        activeMapActivityId: multi ? state.activeMapActivityId : id,
      };
    }),

  selectActivitiesRange: (fromId, toId, allIds) =>
    set(() => {
      const fromIdx = allIds.indexOf(fromId);
      const toIdx = allIds.indexOf(toId);
      if (fromIdx === -1 || toIdx === -1) return {};
      const [start, end] = fromIdx < toIdx ? [fromIdx, toIdx] : [toIdx, fromIdx];
      return { selectedActivityIds: allIds.slice(start, end + 1) };
    }),

  clearSelection: () =>
    set({ selectedActivityIds: [], activeMapActivityId: null }),

  // ─── Map Sync ───────────────────────────────────────────────

  setActiveMapActivity: (id) =>
    set({ activeMapActivityId: id }),

  // ─── Day Panel ──────────────────────────────────────────────

  toggleDayExpanded: (dayId) =>
    set((state) => ({
      expandedDayIds: state.expandedDayIds.includes(dayId)
        ? state.expandedDayIds.filter((id) => id !== dayId)
        : [...state.expandedDayIds, dayId],
    })),

  expandAllDays: (dayIds) => set({ expandedDayIds: dayIds }),
  collapseAllDays: () => set({ expandedDayIds: [] }),

  // ─── Timeline Controls ──────────────────────────────────────

  setTimelineZoom: (zoom) => set({ timelineZoom: zoom }),
  setSortOrder: (order) => set({ sortOrder: order }),
  setTypeFilter: (filter) => set({ typeFilter: filter }),

  // ─── Map ────────────────────────────────────────────────────

  setMapViewport: (viewport) => set({ mapViewport: viewport }),
}));

// ─── Slice Selectors (avoid passing entire store to components) ─

export const useSelectedActivityIds = () =>
  usePlannerUIStore((s) => s.selectedActivityIds);

export const useActiveMapActivityId = () =>
  usePlannerUIStore((s) => s.activeMapActivityId);

export const useExpandedDayIds = () =>
  usePlannerUIStore((s) => s.expandedDayIds);

export const useTimelineZoom = () =>
  usePlannerUIStore((s) => s.timelineZoom);

export const useTypeFilter = () =>
  usePlannerUIStore((s) => s.typeFilter);

export const useMapViewport = () =>
  usePlannerUIStore((s) => s.mapViewport);
