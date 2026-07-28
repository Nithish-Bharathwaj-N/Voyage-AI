import { aiCache } from './AICache';
import type { AIConversation } from '../types/conversation.types';

export class ConversationCache {
  private getPrefix(id: string): string {
    return `conv:${id}`;
  }

  async getConversation(id: string): Promise<AIConversation | null> {
    return aiCache.get<AIConversation>(this.getPrefix(id));
  }

  async setConversation(id: string, conversation: AIConversation): Promise<void> {
    await aiCache.set(this.getPrefix(id), conversation); // No TTL for active session
  }

  async removeConversation(id: string): Promise<void> {
    await aiCache.delete(this.getPrefix(id));
  }
}

export const conversationCache = new ConversationCache();
