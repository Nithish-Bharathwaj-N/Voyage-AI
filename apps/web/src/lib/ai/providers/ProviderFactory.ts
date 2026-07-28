import { GeminiProvider } from './GeminiProvider';
import { OpenAIProvider } from './OpenAIProvider';
import { AnthropicProvider } from './AnthropicProvider';
import { MockProvider } from './MockProvider';
import type { AIProvider, AIProviderId, AIProviderConfig } from '../types/provider.types';

export class ProviderFactory {
  private providers: Map<AIProviderId, AIProvider> = new Map();
  private activeProviderId: AIProviderId = 'mock';

  constructor() {
    this.registerProvider('gemini', new GeminiProvider({ id: 'gemini', name: 'Google Gemini', modelName: 'gemini-1.5-pro' }));
    this.registerProvider('openai', new OpenAIProvider({ id: 'openai', name: 'OpenAI', modelName: 'gpt-4o' }));
    this.registerProvider('anthropic', new AnthropicProvider({ id: 'anthropic', name: 'Anthropic Claude', modelName: 'claude-3.5-sonnet' }));
    this.registerProvider('mock', new MockProvider({ id: 'mock', name: 'Mock Provider', modelName: 'mock-1.0' }));
  }

  registerProvider(id: AIProviderId, provider: AIProvider): void {
    this.providers.set(id, provider);
  }

  setActiveProvider(id: AIProviderId): void {
    if (!this.providers.has(id)) {
      throw new Error(`Provider ${id} not found in factory.`);
    }
    this.activeProviderId = id;
  }

  getActiveProvider(): AIProvider {
    // Force mock provider for Sprint 11A as per requirements
    return this.providers.get('mock')!;
  }

  getProvider(id: AIProviderId): AIProvider | undefined {
    return this.providers.get(id);
  }

  async checkHealth(): Promise<Record<AIProviderId, boolean>> {
    const healthStatus: Record<string, boolean> = {};
    for (const [id, provider] of Array.from(this.providers.entries())) {
      try {
        healthStatus[id] = await provider.health();
      } catch {
        healthStatus[id] = false;
      }
    }
    return healthStatus as Record<AIProviderId, boolean>;
  }
}

export const providerFactory = new ProviderFactory();
