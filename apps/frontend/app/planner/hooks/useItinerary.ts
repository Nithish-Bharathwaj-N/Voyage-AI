import * as React from 'react';
import { Itinerary, PlannerState } from '@/types/itinerary';
import { StopCoordinate } from '../types/planner';
import { plannerService } from '@/services/planner.service';
import { itineraryService } from '@/services/itinerary.service';

export interface UseItineraryResult {
  plannerState: PlannerState | null;
  mapCoords: StopCoordinate[];
  mapCenter: { latitude: number; longitude: number };
  budgetTotal: number;
  budgetLimit: number;
  liveParameters: Partial<{
    destination: string;
    duration: string;
    budget: string;
    companions: string;
    style: string;
    accommodation: string;
    food: string;
    transport: string;
    specialRequests: string;
  }>;
  setLiveParameters: React.Dispatch<React.SetStateAction<Partial<{
    destination: string;
    duration: string;
    budget: string;
    companions: string;
    style: string;
    accommodation: string;
    food: string;
    transport: string;
    specialRequests: string;
  }>>>;
  setPlannerState: (state: PlannerState | null) => void;
  generateItineraryPlan: (params: { destination: string; budget: number; travelers: number; style: string; startDate?: string; endDate?: string }) => Promise<PlannerState>;
  editItineraryPlan: (state: PlannerState, prompt: string) => Promise<PlannerState>;
  moveActivity: (activityId: string, sourceDayIdx: number, destDayIdx: number, destIndex: number) => void;
  saveTripToWorkspace: (plan: PlannerState) => Promise<{ id: string }>;
  resetItinerary: () => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}

/**
 * Hook managing itinerary details, delegating data transformation, marker extractions, and API mutations to services.
 */
export function useItinerary(): UseItineraryResult {
  const [plannerState, setPlannerStateInternal] = React.useState<PlannerState | null>(null);
  const [liveParameters, setLiveParameters] = React.useState<Partial<{
    destination: string;
    duration: string;
    budget: string;
    companions: string;
    style: string;
    accommodation: string;
    food: string;
    transport: string;
    specialRequests: string;
  }>>({});
  
  // History State for Undo/Redo
  const [history, setHistory] = React.useState<PlannerState[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(-1);

  const setPlannerState = React.useCallback((newState: PlannerState | null | ((prev: PlannerState | null) => PlannerState | null)) => {
    setPlannerStateInternal((prev) => {
      const next = typeof newState === 'function' ? newState(prev) : newState;
      
      // Update history if it's a new state and not null
      if (next && next !== prev) {
        setHistory((prevHistory) => {
          const currentHistory = prevHistory.slice(0, historyIndex + 1);
          // Keep last 15 states
          const newHistory = [...currentHistory, next].slice(-15);
          return newHistory;
        });
        setHistoryIndex((prevIndex) => Math.min(prevIndex + 1, 14));
      }
      
      return next;
    });
  }, [historyIndex]);

  const undo = React.useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setPlannerStateInternal(history[historyIndex - 1]);
    }
  }, [history, historyIndex]);

  const redo = React.useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setPlannerStateInternal(history[historyIndex + 1]);
    }
  }, [history, historyIndex]);

  const mapCoords = React.useMemo((): StopCoordinate[] => {
    if (!plannerState) return [];
    return itineraryService.extractMapCoordinates(plannerState as any);
  }, [plannerState]);

  const mapCenter = React.useMemo(() => {
    if (mapCoords.length > 0) {
      return { latitude: mapCoords[0].latitude, longitude: mapCoords[0].longitude };
    }
    return { latitude: 20.5937, longitude: 78.9629 };
  }, [mapCoords]);
  const { budgetTotal, budgetLimit } = React.useMemo(() => {
    if (!plannerState || !plannerState.budget) return { budgetTotal: 0, budgetLimit: 0 };
    return { budgetTotal: plannerState.budget.total || 0, budgetLimit: plannerState.budget.total || 0 };
  }, [plannerState]);

  const generateItineraryPlan = React.useCallback(async (params: { destination: string; budget: number; travelers: number; style: string; startDate?: string; endDate?: string }): Promise<PlannerState> => {
    // Await actual API call for complete itinerary
    const rawItinerary = await plannerService.generateItinerary(params);
    const normalized = itineraryService.validatePlannerResponse(rawItinerary);
    
    // Reset history for new plan
    setHistory([]);
    setHistoryIndex(-1);

    // Set the complete enriched itinerary immediately — no fake delay
    // The backend already returns the fully enriched result
    setPlannerState(normalized);
    return normalized;
  }, [setPlannerState]);

  const editItineraryPlan = React.useCallback(async (currentState: PlannerState, prompt: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('supabase.auth.token') : null;
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    headers['Authorization'] = `Bearer ${token || 'mock-session-jwt-token'}`;

    const res = await fetch('http://localhost:3001/api/v1/ai/edit', {
      method: 'POST',
      headers,
      body: JSON.stringify({ itinerary: currentState, prompt }),
    });

    if (!res.ok) throw new Error('Failed to edit itinerary');
    const data = await res.json();
    const normalized = itineraryService.validatePlannerResponse(data);
    setPlannerState(normalized);
    return normalized;
  }, [setPlannerState]);

  const saveTripToWorkspace = React.useCallback(async (plan: PlannerState): Promise<{ id: string }> => {
    // TODO: Pass dates constraints config
    return plannerService.saveTrip(plan as any, new Date(), new Date());
  }, []);

  const moveActivity = React.useCallback((activityId: string, sourceDayIdx: number, destDayIdx: number, destIndex: number) => {
    setPlannerStateInternal((prev) => {
      if (!prev) return prev;
      
      const newDays = [...(prev.timeline || [])];
      const sourceDay = { ...newDays[sourceDayIdx] };
      const destDay = sourceDayIdx === destDayIdx ? sourceDay : { ...newDays[destDayIdx] };
      
      sourceDay.activities = [...(sourceDay.activities || [])];
      if (sourceDayIdx !== destDayIdx) {
        destDay.activities = [...(destDay.activities || [])];
      }
      
      const sourceIndex = sourceDay.activities.findIndex((a: any) => a.id === activityId);
      if (sourceIndex === -1) return prev; // Not found
      
      const [movedActivity] = sourceDay.activities.splice(sourceIndex, 1);
      
      destDay.activities.splice(destIndex, 0, movedActivity);
      
      newDays[sourceDayIdx] = sourceDay;
      newDays[destDayIdx] = destDay;
      
      const next: PlannerState = { ...prev, timeline: newDays };
      
      // Push to history for undo/redo
      setHistory((prevHistory) => {
        const currentHistory = prevHistory.slice(0, historyIndex + 1);
        return [...currentHistory, next].slice(-15);
      });
      setHistoryIndex((prevIndex) => Math.min(prevIndex + 1, 14));
      
      return next;
    });
  }, [historyIndex]);

  const resetItinerary = React.useCallback(() => {
    setPlannerStateInternal(null);
    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  return {
    plannerState,
    mapCoords,
    mapCenter,
    budgetTotal,
    budgetLimit,
    setPlannerState,
    generateItineraryPlan,
    editItineraryPlan,
    moveActivity,
    saveTripToWorkspace,
    resetItinerary,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    undo,
    redo,
    liveParameters,
    setLiveParameters,
  };
}
