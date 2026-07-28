import type { AIWorkflow, WorkflowState } from '../workflows/types';
import type { AssistantMessage, AssistantResponse } from './types';
import { assistantRepository } from './AssistantRepository';
import { commandParser } from './CommandParser';
import { actionDispatcher } from './ActionDispatcher';
import { followUpGenerator } from './FollowUpGenerator';
import { responseComposer } from './ResponseComposer';
import { messageReducer } from './MessageReducer';
import { assistantAIService } from '../services/AssistantAIService';

export class AssistantWorkflow implements AIWorkflow<string, AssistantResponse> {
  
  async execute(
    sessionId: string,
    messageContent: string,
    onStateChange?: (state: WorkflowState) => void,
    onStreamUpdate?: (partial: Partial<AssistantResponse> | null) => void
  ): Promise<AssistantResponse> {
    
    try {
      const emit = (state: WorkflowState) => {
        if (onStateChange) onStateChange(state);
      };

      // 1. Validate & Init Session
      emit('VALIDATING');
      const session = assistantRepository.getOrCreateSession(sessionId);

      // 2. Load Context (Memory)
      emit('LOADING_CONTEXT');
      const userMsg: AssistantMessage = {
        id: `msg_${Date.now()}`,
        type: 'User',
        content: messageContent,
        timestamp: new Date().toISOString()
      };
      session.memory.addMessage(userMsg);

      const recentMessages = messageReducer.reduce(session.memory.getAllMessages());
      const activePlan = session.getCurrentPlan();

      // 3. Command Parsing
      const command = commandParser.parseCommand(messageContent);

      // 4. Action Dispatching
      const { updatedPlan, actions } = actionDispatcher.dispatch(command, activePlan, messageContent);
      
      // If plan was modified, push to version history
      if (updatedPlan && JSON.stringify(updatedPlan) !== JSON.stringify(activePlan)) {
        session.pushPlanVersion(updatedPlan);
      }

      // 5. Execute AI Orchestrator (Mock)
      emit('EXECUTING_AI');
      
      // We pass a serialized context as the query for the AI Service
      const queryPayload = JSON.stringify({
        messages: recentMessages,
        planModified: !!updatedPlan,
        command
      });

      let responseText = '';
      await assistantAIService.execute(
        sessionId,
        queryPayload,
        (partial) => {
          emit('STREAMING');
          responseText = partial || '';
          if (onStreamUpdate) {
            onStreamUpdate(responseComposer.compose(partial || '', actions, [], updatedPlan || undefined));
          }
        }
      );

      // 6. Generate Follow-ups
      const followUps = followUpGenerator.generate(command);

      // 7. Compose Final Response
      emit('VALIDATING_OUTPUT');
      const finalResponse = responseComposer.compose(responseText, actions, followUps, updatedPlan);

      // Save Assistant message to memory
      const astMsg: AssistantMessage = {
        id: `msg_${Date.now() + 1}`,
        type: 'Assistant',
        content: finalResponse.message,
        timestamp: new Date().toISOString(),
        actions: finalResponse.actions,
        followUps: finalResponse.followUps
      };
      session.memory.addMessage(astMsg);

      emit('COMPLETED');
      return finalResponse;

    } catch (err) {
      if (onStateChange) onStateChange('FAILED');
      throw err;
    }
  }
}

export const assistantWorkflow = new AssistantWorkflow();
