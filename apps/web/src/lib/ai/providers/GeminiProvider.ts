import type { AIProvider, AIProviderConfig, AIProviderCapabilities, AIProviderResponse, AIStreamChunk } from '../types/provider.types';

export class GeminiProvider implements AIProvider {
  config: AIProviderConfig;
  capabilities: AIProviderCapabilities;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.capabilities = {
      supportsStreaming: true,
      supportsVision: true,
      supportsTools: true,
      maxTokens: 1048576, // 1M context
    };
  }

  async initialize(): Promise<void> {
    // Architecture shell for Gemini
  }

  async chat(messages: unknown[], tools?: unknown[]): Promise<AIProviderResponse> {
    throw new Error('Not implemented. Live LLM calls are disabled in Sprint 11A.');
  }

  async stream(messages: unknown[], tools?: unknown[], onChunk?: (chunk: AIStreamChunk) => void): Promise<AIProviderResponse> {
    throw new Error('Not implemented. Live LLM calls are disabled in Sprint 11A.');
  }

  async embeddings(input: string): Promise<number[]> {
    throw new Error('Not implemented.');
  }

  async health(): Promise<boolean> {
    return true;
  }

  async dispose(): Promise<void> {}
}
