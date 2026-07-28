import { BaseAIService } from './BaseAIService';
import type { PromptDomain } from '../types/prompt.types';

export class PackingAIService extends BaseAIService<string, string> {
  protected get domain(): PromptDomain {
    return 'packing';
  }

  protected validate(input: string): boolean {
    return input.trim().length > 0;
  }

  protected mapResponse(rawOutput: string): string {
    return rawOutput; // Markdown response
  }
}

export const packingAIService = new PackingAIService();
