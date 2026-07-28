import { conversationCache } from '../cache/ConversationCache';
import type { AIConversation, AIMessage } from '../types/conversation.types';

export class ConversationManager {
  async createConversation(title: string = 'New Conversation'): Promise<AIConversation> {
    const id = `conv_${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const conversation: AIConversation = {
      id,
      title,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    
    await conversationCache.setConversation(id, conversation);
    return conversation;
  }

  async getConversation(id: string): Promise<AIConversation | null> {
    return conversationCache.getConversation(id);
  }

  async addMessage(conversationId: string, message: AIMessage): Promise<void> {
    const conversation = await this.getConversation(conversationId);
    if (!conversation) throw new Error('Conversation not found');
    
    conversation.messages.push(message);
    conversation.updatedAt = new Date().toISOString();
    
    await conversationCache.setConversation(conversationId, conversation);
  }

  async updateMessageStatus(conversationId: string, messageId: string, status: AIMessage['status'], content?: string): Promise<void> {
    const conversation = await this.getConversation(conversationId);
    if (!conversation) return;
    
    const msg = conversation.messages.find(m => m.id === messageId);
    if (msg) {
      msg.status = status;
      if (content !== undefined) {
        msg.content = content;
      }
      await conversationCache.setConversation(conversationId, conversation);
    }
  }
}

export const conversationManager = new ConversationManager();
