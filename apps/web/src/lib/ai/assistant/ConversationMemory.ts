import type { AssistantMessage } from './types';
import { ConversationContext } from './ConversationContext';

export class ConversationMemory {
  private messages: AssistantMessage[] = [];
  public context: ConversationContext = new ConversationContext();
  private maxContextMessages = 50;

  addMessage(msg: AssistantMessage) {
    this.messages.push(msg);
    // Simple truncation (MessageReducer handles this in more complex scenarios)
    if (this.messages.length > this.maxContextMessages) {
      this.messages = this.messages.slice(-this.maxContextMessages);
    }
  }

  getRecentMessages(limit = 10): AssistantMessage[] {
    return this.messages.slice(-limit);
  }

  getAllMessages(): AssistantMessage[] {
    return [...this.messages];
  }
}
