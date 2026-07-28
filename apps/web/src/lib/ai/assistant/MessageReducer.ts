import type { AssistantMessage } from './types';

export class MessageReducer {
  /**
   * Optimizes context window by filtering out unneeded system or tool messages,
   * summarizing older parts of the conversation, or truncating.
   */
  reduce(messages: AssistantMessage[], maxTokens = 4000): AssistantMessage[] {
    // Basic mock implementation: just returns last N messages.
    // In a real system, this would tokenize and compress content.
    return messages.slice(-15);
  }
}

export const messageReducer = new MessageReducer();
