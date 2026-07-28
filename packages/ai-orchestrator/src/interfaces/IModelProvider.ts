import { z } from 'zod';

export interface ModelResponse<T> {
  data: T;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  latencyMs: number;
  provider: string;
}

export interface IModelProvider {
  /**
   * Free-form text generation.
   */
  generate(prompt: string, systemPrompt?: string): Promise<ModelResponse<string>>;

  /**
   * Structured JSON generation bounded by a Zod Schema.
   */
  generateStructured<T>(
    prompt: string, 
    schema: z.ZodType<T>, 
    systemPrompt?: string
  ): Promise<ModelResponse<T>>;

  /**
   * Health check to ensure API keys and network are valid.
   */
  healthCheck(): Promise<boolean>;

  /**
   * Estimates token usage prior to sending a prompt.
   */
  estimateTokens(prompt: string): Promise<number>;
}
