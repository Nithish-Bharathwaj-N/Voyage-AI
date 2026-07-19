/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import { Injectable, Logger } from '@nestjs/common';
import { AiProvider, AiProviderOptions, ProviderHealth } from '../interfaces/ai-provider.interface';
import * as crypto from 'crypto';

@Injectable()
export class LocalProvider implements AiProvider {
  private readonly logger = new Logger('LocalProvider');

  readonly name = 'local';

  async generateText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<string> {
    throw new Error('Local mock disabled in Root Cause Analysis Mode. Live AI generation (Gemini) is strictly required.');
  }

  async generateStructuredOutput<T>(
    prompt: string,
    schema: Record<string, unknown>,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<T> {
    throw new Error('Local mock disabled in Root Cause Analysis Mode. Live AI generation (Gemini) is strictly required.');
  }

  async *streamText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): AsyncGenerator<string, void, unknown> {
    throw new Error('Local mock disabled in Root Cause Analysis Mode. Live AI generation (Gemini) is strictly required.');
  }

  async embedText(text: string, options?: AiProviderOptions): Promise<number[]> {
    return [0.1, 0.2, 0.3];
  }

  countTokens(text: string, model?: string): number {
    return Math.ceil(text.length / 4);
  }

  async healthCheck(): Promise<ProviderHealth> {
    return { isHealthy: true, latencyMs: 50 };
  }

  estimateCost(inputTokens: number, outputTokens: number, model?: string): number {
    return 0;
  }

  estimateLatency(model?: string): number {
    return 500;
  }
}
