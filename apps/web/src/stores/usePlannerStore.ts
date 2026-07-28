import { create } from 'zustand';
import { temporal } from 'zundo';

// Define minimal types for the store since we're scaffolding
export interface PlannerActivity {
  id: string;
  title: string;
  costMin: number;
  costMax: number;
}

export interface PlannerDay {
  id: string;
  date: string;
  activities: PlannerActivity[];
}

export interface TripState {
  id: string;
  title: string;
  days: PlannerDay[];
}

export interface PlannerStore {
  // Data State
  trip: TripState | null;
  setTrip: (trip: TripState) => void;
  moveActivity: (sourceDayId: string, destDayId: string, sourceIndex: number, destIndex: number) => void;

  // Transient UI State (Not recorded in undo history)
  hoveredActivityId: string | null;
  setHoveredActivityId: (id: string | null) => void;
  selectedDayId: string | null;
  setSelectedDayId: (id: string | null) => void;

  // Computed
  getComputedBudget: () => { min: number; max: number };
}

export const usePlannerStore = create<PlannerStore>()(
  temporal(
    (set, get) => ({
      trip: null,
      hoveredActivityId: null,
      selectedDayId: null,

      setTrip: (trip) => set({ trip }),
      
      moveActivity: (sourceDayId, destDayId, sourceIndex, destIndex) => set((state) => {
        if (!state.trip) return state;
        
        // Deep clone for mutation
        const newTrip = JSON.parse(JSON.stringify(state.trip)) as TripState;
        
        const sourceDay = newTrip.days.find(d => d.id === sourceDayId);
        const destDay = newTrip.days.find(d => d.id === destDayId);
        
        if (!sourceDay || !destDay) return state;
        
        const [moved] = sourceDay.activities.splice(sourceIndex, 1);
        destDay.activities.splice(destIndex, 0, moved);
        
        return { trip: newTrip };
      }),

      setHoveredActivityId: (id) => set({ hoveredActivityId: id }),
      setSelectedDayId: (id) => set({ selectedDayId: id }),

      getComputedBudget: () => {
        const trip = get().trip;
        if (!trip) return { min: 0, max: 0 };
        
        let min = 0;
        let max = 0;
        trip.days.forEach(day => {
          day.activities.forEach(act => {
            min += act.costMin || 0;
            max += act.costMax || 0;
          });
        });
        
        return { min, max };
      }
    }),
    {
      partialize: (state) => {
        // Only track the trip object for undo/redo. Don't track hover states!
        return { trip: state.trip };
      },
    }
  )
);
