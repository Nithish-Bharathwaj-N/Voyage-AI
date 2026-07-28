export type AIProviderId = 'gemini' | 'openai' | 'anthropic' | 'mock';

export interface AIProviderCapabilities {
  supportsStreaming: boolean;
  supportsVision: boolean;
  supportsTools: boolean;
  maxTokens: number;
}

export interface AIProviderConfig {
  id: AIProviderId;
  name: string;
  modelName: string;
  temperature?: number;
  apiKey?: string;
}

export interface AIProviderResponse {
  content: string;
  toolCalls?: AIToolCall[];
  tokensUsed?: number;
}

export interface AIStreamChunk {
  content: string;
  isFinished: boolean;
}

export interface AIToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface AIProvider {
  config: AIProviderConfig;
  capabilities: AIProviderCapabilities;

  initialize(): Promise<void>;
  chat(messages: unknown[], tools?: unknown[]): Promise<AIProviderResponse>;
  stream(messages: unknown[], tools?: unknown[], onChunk?: (chunk: AIStreamChunk) => void): Promise<AIProviderResponse>;
  embeddings(input: string): Promise<number[]>;
  health(): Promise<boolean>;
  dispose(): Promise<void>;
}
