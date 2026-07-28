import { Injectable, Logger, Inject } from '@nestjs/common';
import { ProviderFactory, ProviderName } from '../providers/ProviderFactory';

export interface AIExecutionOptions {
  provider?: ProviderName;
  temperature?: number;
  maxTokens?: number;
  tools?: Record<string, unknown>[];
  stream?: boolean;
  context?: Record<string, unknown>;
}

@Injectable()
export class AIOrchestrator {
  private readonly logger = new Logger(AIOrchestrator.name);

  constructor(@Inject(ProviderFactory) private readonly providerFactory: ProviderFactory) {}

  public async execute(
    prompt: string, 
    options: AIExecutionOptions = {}
  ): Promise<string> {
    const startTime = Date.now();
    this.logger.log(`Starting AI execution. Streaming: ${!!options.stream}`);

    try {
      const provider = await this.providerFactory.getBestAvailableProvider(options.provider);
      
      const response = await provider.chat(prompt, {
        temperature: options.temperature ?? 0.7,
        maxTokens: options.maxTokens,
        tools: options.tools,
        ...options.context
      });

      const latency = Date.now() - startTime;
      this.logger.log(`AI execution completed in ${latency}ms`);
      
      return response;

    } catch (error) {
      this.logger.error(`AI Orchestration failed: ${error instanceof Error ? error.message : String(error)}`);
      throw Object.assign(new Error(`AI Orchestration failed: ${error instanceof Error ? error.message : String(error)}`), { cause: error });
    }
  }

  public async executeStream(
    prompt: string, 
    onToken: (token: string) => void,
    options: AIExecutionOptions = {}
  ): Promise<void> {
    const startTime = Date.now();
    this.logger.log(`Starting AI Stream execution`);

    try {
      const provider = await this.providerFactory.getBestAvailableProvider(options.provider);
      
      await provider.stream(
        prompt, 
        onToken, 
        {
          temperature: options.temperature ?? 0.7,
          maxTokens: options.maxTokens,
          tools: options.tools,
          ...options.context
        }
      );

      const latency = Date.now() - startTime;
      this.logger.log(`AI Stream execution completed in ${latency}ms`);
      
    } catch (error) {
      this.logger.error(`AI Stream failed: ${error instanceof Error ? error.message : String(error)}`);
      throw Object.assign(new Error(`AI Stream failed: ${error instanceof Error ? error.message : String(error)}`), { cause: error });
    }
  }
}
