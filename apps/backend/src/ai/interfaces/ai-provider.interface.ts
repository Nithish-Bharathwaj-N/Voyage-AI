export interface AiProviderOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface ProviderHealth {
  isHealthy: boolean;
  latencyMs: number;
  error?: string;
}

export interface AiProvider {
  /**
   * The unique identifier for this provider.
   */
  readonly name: string;

  /**
   * Generate raw text response.
   */
  generateText(prompt: string, systemPrompt?: string, options?: AiProviderOptions): Promise<string>;

  /**
   * Generate a structured JSON response matching the provided schema.
   */
  generateStructuredOutput<T>(
    prompt: string,
    schema: Record<string, unknown>,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<T>;

  /**
   * Stream text response.
   */
  streamText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): AsyncGenerator<string, void, unknown>;

  /**
   * Generate embeddings for the given text.
   */
  embedText(text: string, options?: AiProviderOptions): Promise<number[]>;

  /**
   * Count the number of tokens in the given text.
   */
  countTokens(text: string, model?: string): number;

  /**
   * Check the health and availability of the provider.
   */
  healthCheck(): Promise<ProviderHealth>;

  /**
   * Estimate the cost in USD for the given token count and model.
   */
  estimateCost(inputTokens: number, outputTokens: number, model?: string): number;

  /**
   * Estimate the latency in milliseconds for the given model.
   */
  estimateLatency(model?: string): number;
}
