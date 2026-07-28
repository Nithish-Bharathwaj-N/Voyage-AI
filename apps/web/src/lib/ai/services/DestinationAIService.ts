import { BaseAIService } from './BaseAIService';
import type { PromptDomain } from '../types/prompt.types';

export class DestinationAIService extends BaseAIService<string, string> {
  protected get domain(): PromptDomain {
    return 'destination';
  }

  protected validate(input: string): boolean {
    return input.trim().length > 0;
  }

  protected mapResponse(rawOutput: string): string {
    return rawOutput; // Markdown response
  }
}

export const destinationAIService = new DestinationAIService();
