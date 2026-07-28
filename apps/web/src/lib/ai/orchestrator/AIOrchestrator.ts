import { conversationManager } from './ConversationManager';
import { streamManager } from './StreamManager';
import { executionPipeline } from './ExecutionPipeline';
import type { PromptDomain } from '../types/prompt.types';
import type { AIMessage } from '../types/conversation.types';
import { providerFactory } from '../providers/ProviderFactory';

export class AIOrchestrator {
  
  async sendQuery(
    conversationId: string, 
    query: string, 
    domain: PromptDomain = 'general',
    onUpdate?: (content: string) => void
  ): Promise<void> {
    
    // 1. Create User Message
    const userMessage: AIMessage = {
      id: `msg_${Date.now()}_u`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    await conversationManager.addMessage(conversationId, userMessage);
    
    // 2. Create Assistant Placeholder Message
    const provider = providerFactory.getActiveProvider();
    const assistantMsgId = `msg_${Date.now()}_a`;
    const assistantMessage: AIMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      status: 'thinking',
      providerId: provider.config.id,
    };
    await conversationManager.addMessage(conversationId, assistantMessage);
    
    // 3. Kick off the Execution Pipeline
    // We do NOT await this if we want to return immediately and let the pipeline run async
    // However, for strict flow control in TanStack queries, awaiting is safer.
    await executionPipeline.execute(
      conversationId,
      query,
      assistantMsgId,
      domain,
      onUpdate
    );
  }
  
  cancelStream(messageId: string): void {
    streamManager.cancelStream(messageId);
  }
}

export const aiOrchestrator = new AIOrchestrator();
