import { Injectable, Logger } from '@nestjs/common';
import { AiProviderRegistry } from './ai-provider-registry.service';
import { AiRouterService, AiTaskType } from './ai-router.service';
import { CacheService } from '../../integrations/services/cache.service';
import { AiProviderOptions } from '../interfaces/ai-provider.interface';
import { ProviderUnavailableException } from '../../integrations/exceptions/provider-unavailable.exception';
import * as crypto from 'crypto';

@Injectable()
export class AiProviderManager {
  private readonly logger = new Logger(AiProviderManager.name);

  constructor(
    private readonly registry: AiProviderRegistry,
    private readonly router: AiRouterService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Generates text with intelligent routing, caching, fallbacks, and observability.
   */
  async generateText(
    taskType: AiTaskType,
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<string> {
    // 1. Resolve primary model
    const routed = this.router.route(taskType);
    const mergedOptions = { ...options, model: options?.model || routed.model };

    // 2. Cache check for deterministic requests (temperature = 0)
    if (mergedOptions.temperature === 0) {
      const cacheKey = this.buildCacheKey(prompt, systemPrompt, mergedOptions);
      const cached = await this.cacheService.get<string>(cacheKey);
      if (cached) {
        this.logger.log(`Cache HIT for AI Task: ${taskType}`);
        return cached;
      }
    }

    // 3. Execution with Fallback Chain
    const providers = [routed.provider, ...this.router.getFallbackChain(routed.provider)];

    for (const providerName of providers) {
      const provider = this.registry.getProvider(providerName);
      const startMs = Date.now();

      try {
        if (providerName === 'local') {
          this.logger.error(`[ROOT CAUSE ANALYSIS] Falling back to LOCAL mock provider because all upstream AI models failed!`);
        } else {
          this.logger.log(
            `Executing task ${taskType} via provider ${provider.name} (model: ${mergedOptions.model})`,
          );
        }

        const result = await provider.generateText(prompt, systemPrompt, mergedOptions);

        const latency = Date.now() - startMs;
        const tokens = provider.countTokens(
          prompt + (systemPrompt || '') + result,
          mergedOptions.model,
        );
        const cost = provider.estimateCost(tokens, tokens, mergedOptions.model); // Approx input=output for now

        this.logger.log(
          `AI Success [${provider.name}] - Latency: ${latency}ms | Tokens: ${tokens} | Cost: $${cost.toFixed(4)}`,
        );

        // Cache result if deterministic
        if (mergedOptions.temperature === 0) {
          const cacheKey = this.buildCacheKey(prompt, systemPrompt, mergedOptions);
          await this.cacheService.set(cacheKey, result, 86400); // 24h
        }

        return result;
      } catch (error) {
        this.logger.error(
          `[ROOT CAUSE ANALYSIS] AI Provider ${provider.name} failed exactly because: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error.stack : undefined
        );
        // Continue to next provider in fallback chain
      }
    }

    throw new ProviderUnavailableException(
      'All AI Providers',
      'All providers in the fallback chain failed.',
    );
  }

  /**
   * Stream text response using an AsyncGenerator.
   */
  async *streamText(
    taskType: AiTaskType,
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): AsyncGenerator<string, void, unknown> {
    const routed = this.router.route(taskType);
    const mergedOptions = { ...options, model: options?.model || routed.model };
    const providers = [routed.provider, ...this.router.getFallbackChain(routed.provider)];

    for (const providerName of providers) {
      const provider = this.registry.getProvider(providerName);

      try {
        if (providerName === 'local') {
          this.logger.error(`[ROOT CAUSE ANALYSIS] Streaming fallback to LOCAL mock provider because upstream AI failed!`);
        } else {
          this.logger.log(`Streaming task ${taskType} via provider ${provider.name}`);
        }
        const stream = provider.streamText(prompt, systemPrompt, mergedOptions);

        for await (const chunk of stream) {
          yield chunk;
        }

        return; // Success, exit chain
      } catch (error) {
        this.logger.error(
          `[ROOT CAUSE ANALYSIS] AI Streaming failed on ${provider.name} exactly because: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error.stack : undefined
        );
        // Continue to fallback
      }
    }

    throw new ProviderUnavailableException('All AI Providers', 'All streaming providers failed.');
  }

  private buildCacheKey(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): string {
    const data = JSON.stringify({ prompt, systemPrompt, options });
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return `ai:cache:${hash}`;
  }
}
