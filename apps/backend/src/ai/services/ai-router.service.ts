import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type AiTaskType =
  | 'simple-summary'
  | 'complex-itinerary'
  | 'image-reasoning'
  | 'budget-optimization'
  | 'general';

export interface RoutedModel {
  provider: string;
  model: string;
}

@Injectable()
export class AiRouterService {
  private readonly logger = new Logger(AiRouterService.name);

  constructor(private readonly configService: ConfigService) {}

  /**
   * Intelligently routes a task to the most appropriate provider and model.
   * Can be configured via environment variables or feature flags in the future.
   */
  route(taskType: AiTaskType): RoutedModel {
    this.logger.debug(`[AI Router] Routing task: ${taskType}`);

    // If a global override is set (e.g. for testing), respect it
    const globalProvider = this.configService.get<string>('AI_PROVIDER_OVERRIDE');
    if (globalProvider) {
      this.logger.debug(`[AI Router] Global override detected. Provider: ${globalProvider}`);
      return { provider: globalProvider, model: 'default' };
    }

    let selected: RoutedModel;
    switch (taskType) {
      case 'complex-itinerary':
      case 'budget-optimization':
        selected = { provider: 'gemini', model: 'gemini-flash-lite-latest' };
        break;

      case 'simple-summary':
      case 'image-reasoning':
      case 'general':
      default:
        selected = { provider: 'gemini', model: 'gemini-flash-lite-latest' };
        break;
    }
    
    this.logger.debug(`[AI Router] Selected Provider: ${selected.provider}, Model: ${selected.model}`);
    return selected;
  }

  getFallbackChain(primaryProvider: string): string[] {
    const chain: string[] = [];

    // Simple fallback heuristics
    if (primaryProvider === 'claude') {
      chain.push('openai', 'gemini', 'openrouter', 'local');
    } else if (primaryProvider === 'openai') {
      chain.push('claude', 'gemini', 'openrouter', 'local');
    } else if (primaryProvider === 'gemini') {
      chain.push('openai', 'claude', 'openrouter', 'local');
    } else if (primaryProvider === 'openrouter') {
      chain.push('openai', 'claude', 'gemini', 'local');
    } else {
      chain.push('local');
    }

    this.logger.warn(`[AI Router] Generating fallback chain for ${primaryProvider}: [${chain.join(', ')}]`);
    return chain;
  }
}
