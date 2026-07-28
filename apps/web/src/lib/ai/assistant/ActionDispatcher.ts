import type { AssistantCommand, AssistantAction } from './types';
import type { AITripPlan } from '../planner/types';

export class ActionDispatcher {
  
  public dispatch(command: AssistantCommand, currentPlan: AITripPlan | null, message: string): { updatedPlan?: AITripPlan; actions: AssistantAction[] } {
    if (!currentPlan) {
      return { actions: [] };
    }

    const newPlan = JSON.parse(JSON.stringify(currentPlan)) as AITripPlan;
    const actions: AssistantAction[] = [];

    // Mock modifications based on command
    if (command === 'UpdateBudget') {
      newPlan.budget = 'Budget optimized based on your request.';
      actions.push({ id: `act_${Date.now()}`, type: 'update_budget', payload: { new_budget: newPlan.budget } });
    } else if (command === 'UpdateHotel') {
      if (newPlan.accommodation) {
        newPlan.accommodation = ['Boutique Hotel changed per request'];
        actions.push({ id: `act_${Date.now()}`, type: 'update_hotel', payload: { hotel: newPlan.accommodation[0] } });
      }
    } else if (command === 'AddActivity') {
      if (newPlan.days && newPlan.days.length > 0) {
        newPlan.days[0].afternoon.push({
          id: `act_${Date.now()}`,
          time: '18:00',
          title: 'Sunset Walk (Added)',
          description: 'A new activity added via assistant',
          location: 'City Center'
        });
        actions.push({ id: `act_${Date.now()}`, type: 'add_activity', payload: { day: 1, activity: 'Sunset Walk' } });
      }
    } else if (command === 'ShortenTrip') {
       if (newPlan.days && newPlan.days.length > 1) {
         newPlan.days.pop();
         actions.push({ id: `act_${Date.now()}`, type: 'shorten_trip', payload: { days_removed: 1 } });
       }
    } else if (command === 'Unknown') {
       // Just returning conversation action
       actions.push({ id: `act_${Date.now()}`, type: 'general_chat', payload: {} });
    } else {
       actions.push({ id: `act_${Date.now()}`, type: 'generic_update', payload: { command } });
    }

    return { updatedPlan: newPlan, actions };
  }
}

export const actionDispatcher = new ActionDispatcher();
