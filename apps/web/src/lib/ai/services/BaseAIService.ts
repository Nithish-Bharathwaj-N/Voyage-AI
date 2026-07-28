import { aiOrchestrator } from '../orchestrator/AIOrchestrator';
import type { PromptDomain } from '../types/prompt.types';

export abstract class BaseAIService<TInput, TOutput> {
  
  protected abstract get domain(): PromptDomain;
  
  /**
   * Validates the domain-specific input data.
   */
  protected abstract validate(input: TInput): boolean;

  /**
   * Maps the final string output from the LLM into the domain-specific type.
   */
  protected abstract mapResponse(rawOutput: string): TOutput;

  /**
   * Optional progressive mapper for streaming scenarios.
   */
  protected mapStreamChunk?(rawChunk: string): Partial<TOutput> | null;

  /**
   * Formats the input into a string query for the Orchestrator.
   */
  protected formatQuery(input: TInput): string {
    return typeof input === 'string' ? input : JSON.stringify(input);
  }

  /**
   * Executes the AI workflow for this domain.
   */
  public async execute(
    sessionId: string,
    input: TInput,
    onStreamUpdate?: (partial: Partial<TOutput> | null) => void
  ): Promise<TOutput> {
    
    if (!this.validate(input)) {
      throw new Error(`Validation failed for domain: ${this.domain}`);
    }

    const query = this.formatQuery(input);
    let finalRawContent = '';

    await aiOrchestrator.sendQuery(
      sessionId,
      query,
      this.domain,
      (contentChunk) => {
        finalRawContent = contentChunk;
        if (onStreamUpdate && this.mapStreamChunk) {
          const partial = this.mapStreamChunk(contentChunk);
          onStreamUpdate(partial);
        }
      }
    );

    return this.mapResponse(finalRawContent);
  }
}
