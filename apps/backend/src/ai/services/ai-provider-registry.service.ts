/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AiProvider } from '../interfaces/ai-provider.interface';
import { LocalProvider } from '../providers/local.provider';
import { OpenAiProvider } from '../providers/openai.provider';
import { ClaudeProvider } from '../providers/claude.provider';
import { GeminiProvider } from '../providers/gemini.provider';
import { DeepSeekProvider } from '../providers/deepseek.provider';
import { OpenRouterProvider } from '../providers/openrouter.provider';

@Injectable()
export class AiProviderRegistry implements OnModuleInit {
  private readonly logger = new Logger(AiProviderRegistry.name);
  private readonly providers = new Map<string, AiProvider>();

  constructor(
    private readonly localProvider: LocalProvider,
    private readonly openaiProvider: OpenAiProvider,
    private readonly claudeProvider: ClaudeProvider,
    private readonly geminiProvider: GeminiProvider,
    private readonly deepseekProvider: DeepSeekProvider,
    private readonly openrouterProvider: OpenRouterProvider,
  ) {}

  onModuleInit() {
    this.registerProvider(this.localProvider);
    this.registerProvider(this.openaiProvider);
    this.registerProvider(this.claudeProvider);
    this.registerProvider(this.geminiProvider);
    this.registerProvider(this.deepseekProvider);
    this.registerProvider(this.openrouterProvider);
  }

  private registerProvider(provider: AiProvider) {
    this.providers.set(provider.name.toLowerCase(), provider);
  }

  getProvider(name: string): AiProvider {
    const normalizedName = name.toLowerCase().trim();
    const provider = this.providers.get(normalizedName);

    if (!provider) {
      this.logger.warn(`Provider ${name} not found. Falling back to local provider.`);
      return this.providers.get('local')!;
    }

    return provider;
  }

  getAllProviders(): AiProvider[] {
    return Array.from(this.providers.values());
  }
}
