export type MessageRole = 'user' | 'assistant' | 'system' | 'tool' | 'error';
export type MessageStatus = 'idle' | 'thinking' | 'calling_tools' | 'streaming' | 'completed' | 'cancelled' | 'failed';

export interface AIMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  status: MessageStatus;
  providerId?: string;
  latencyMs?: number;
  tokensEstimated?: number;
  toolCalls?: unknown[];
  attachments?: unknown[];
  citations?: unknown[];
}

export interface AIConversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: AIMessage[];
  contextId?: string;
}
