export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export class ConversationMemory {
  // Simulating Redis or PostgreSQL for memory
  private memory = new Map<string, Message[]>();

  async addMessage(tripId: string, role: 'user' | 'assistant', content: string): Promise<void> {
    const messages = this.memory.get(tripId) || [];
    messages.push({ role, content, timestamp: Date.now() });
    
    // Maintain a rolling window of the last 20 messages to prevent token bloat
    if (messages.length > 20) {
      messages.shift();
    }
    
    this.memory.set(tripId, messages);
  }

  async getHistory(tripId: string): Promise<Message[]> {
    return this.memory.get(tripId) || [];
  }

  async clear(tripId: string): Promise<void> {
    this.memory.delete(tripId);
  }
}
