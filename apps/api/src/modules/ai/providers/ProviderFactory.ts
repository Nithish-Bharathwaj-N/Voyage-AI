import { Injectable, Logger, Inject } from '@nestjs/common';
import { AIProvider } from './types';
import { OpenAIProvider } from './OpenAIProvider';
import { GeminiProvider } from './GeminiProvider';
import { AnthropicProvider } from './AnthropicProvider';

export type ProviderName = 'openai' | 'gemini' | 'anthropic';

@Injectable()
export class ProviderFactory {
  private readonly logger = new Logger(ProviderFactory.name);

  constructor(
    @Inject(OpenAIProvider) private readonly openAIProvider: OpenAIProvider,
    @Inject(GeminiProvider) private readonly geminiProvider: GeminiProvider,
    @Inject(AnthropicProvider) private readonly anthropicProvider: AnthropicProvider
  ) {}

  public getProvider(name: ProviderName): AIProvider {
    this.logger.log(`Fetching provider instance for: ${name}`);
    
    switch (name) {
      case 'openai':
        return this.openAIProvider;
      case 'gemini':
        return this.geminiProvider;
      case 'anthropic':
        return this.anthropicProvider;
      default:
        this.logger.warn(`Unknown provider requested: ${name}. Falling back to gemini.`);
        return this.geminiProvider;
    }
  }

  public async getBestAvailableProvider(preferred?: ProviderName): Promise<AIProvider> {
    const order: ProviderName[] = preferred 
      ? [preferred, 'gemini', 'openai', 'anthropic'] 
      : ['gemini', 'openai', 'anthropic'];

    for (const name of order) {
      const provider = this.getProvider(name);
      if (await provider.health()) {
        return provider;
      }
    }

    this.logger.warn('No providers are fully healthy. Falling back to Gemini mock mode.');
    return this.geminiProvider;
  }
}
