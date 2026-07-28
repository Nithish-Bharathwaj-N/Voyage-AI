import { aiOrchestrator } from '../orchestrator/AIOrchestrator';
import { conversationManager } from '../orchestrator/ConversationManager';
import { providerFactory } from '../providers/ProviderFactory';
import type { PromptDomain } from '../types/prompt.types';
import type { AIConversation } from '../types/conversation.types';

class AIRepository {
  async createConversation(title?: string): Promise<AIConversation> {
    return conversationManager.createConversation(title);
  }

  async getConversation(id: string): Promise<AIConversation | null> {
    return conversationManager.getConversation(id);
  }

  async sendQuery(
    conversationId: string, 
    query: string, 
    domain?: PromptDomain,
    onUpdate?: (content: string) => void
  ): Promise<void> {
    return aiOrchestrator.sendQuery(conversationId, query, domain, onUpdate);
  }

  cancelStream(messageId: string): void {
    aiOrchestrator.cancelStream(messageId);
  }
  
  async getHealth(): Promise<Record<string, boolean>> {
    return providerFactory.checkHealth();
  }
}

export const aiRepository = new AIRepository();
