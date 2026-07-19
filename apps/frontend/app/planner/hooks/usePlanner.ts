import * as React from 'react';
import { useConversation, UseConversationResult } from './useConversation';
import { usePlannerState, UsePlannerStateResult } from './usePlannerState';
import { usePlannerPersistence, UsePlannerPersistenceResult } from './usePlannerPersistence';
import { useThinkingAnimation, UseThinkingAnimationResult } from './useThinkingAnimation';
import { useItinerary, UseItineraryResult } from './useItinerary';
import { useAuth } from '@/components/providers/auth-provider';
import { toast } from 'sonner';

export interface UsePlannerResult {
  conversation: UseConversationResult;
  state: UsePlannerStateResult;
  persistence: UsePlannerPersistenceResult;
  thinking: UseThinkingAnimationResult;
  itinerary: UseItineraryResult;
  handleSaveTrip: () => Promise<void>;
  handleReset: () => void;
}

/**
 * Master controller orchestrator composing conversational, state, persistence, animation, and itinerary sub-hooks.
 */
export function usePlanner(): UsePlannerResult {
  const { user } = useAuth();
  const conversation = useConversation();
  const state = usePlannerState();
  const persistence = usePlannerPersistence();
  const thinking = useThinkingAnimation();
  const itinerary = useItinerary();

  /**
   * Action handler coordinating auth checks, localStorage caching, and DB commits when saving trip previews.
   */
  const handleSaveTrip = React.useCallback(async () => {
    const activePlan = itinerary.plannerState;
    if (!activePlan || state.saving) return;

    if (!user) {
      // Unauthenticated -> cache temp plan and trigger registration prompt modal
      try {
        persistence.saveTempItinerary(activePlan as any);
        state.setSaving(false);
        // TODO: Trigger LoginRequiredDialog modal visibility here
      } catch (e) {
        toast.error('Failed to cache temporary itinerary.');
      }
      return;
    }

    state.setSaving(true);
    try {
      await itinerary.saveTripToWorkspace(activePlan);
      persistence.clearTempItinerary();
      toast.success('Itinerary saved to workspace!');
    } catch (e) {
      toast.error('Failed to save trip to database.');
    } finally {
      state.setSaving(false);
    }
  }, [user, itinerary, state, persistence]);

  /**
   * Action handler resetting all planner sub-states.
   */
  const handleReset = React.useCallback(() => {
    conversation.resetConversation();
    state.resetState();
    thinking.stopThinking();
    itinerary.resetItinerary();
  }, [conversation, state, thinking, itinerary]);

  return {
    conversation,
    state,
    persistence,
    thinking,
    itinerary,
    handleSaveTrip,
    handleReset
  };
}
