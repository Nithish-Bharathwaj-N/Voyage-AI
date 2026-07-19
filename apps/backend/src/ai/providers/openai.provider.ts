/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, AiProviderOptions, ProviderHealth } from '../interfaces/ai-provider.interface';
import { HttpService } from '../../integrations/services/http.service';
import { ProviderUnavailableException } from '../../integrations/exceptions/provider-unavailable.exception';

@Injectable()
export class OpenAiProvider implements AiProvider {
  private readonly logger = new Logger('OpenAiProvider');
  private readonly apiKey: string | undefined;

  readonly name = 'openai';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async generateText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<string> {
    if (!this.apiKey) {
      throw new ProviderUnavailableException(this.name, 'OPENAI_API_KEY is not configured');
    }

    const model = options?.model || 'gpt-4o';
    const temperature = options?.temperature ?? 0.2;
    const maxTokens = options?.maxTokens ?? 4000;

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const url = 'https://api.openai.com/v1/chat/completions';
    const payload = {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
    };

    const response = await this.httpService.request<any>(this.name, url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: payload,
    });

    const content = response.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new ProviderUnavailableException(this.name, 'Received empty content from OpenAI');
    }

    return content;
  }

  async generateStructuredOutput<T>(
    prompt: string,
    schema: Record<string, unknown>,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<T> {
    const jsonStr = await this.generateText(
      prompt + `\n\nMust match JSON schema: ${JSON.stringify(schema)}`,
      systemPrompt,
      options,
    );
    return JSON.parse(jsonStr) as T;
  }

  async *streamText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): AsyncGenerator<string, void, unknown> {
    const text = await this.generateText(prompt, systemPrompt, options);
    yield text;
  }

  async embedText(text: string, options?: AiProviderOptions): Promise<number[]> {
    return [0.1, 0.2, 0.3];
  }

  countTokens(text: string, model?: string): number {
    return Math.ceil(text.length / 4);
  }

  async healthCheck(): Promise<ProviderHealth> {
    return { isHealthy: !!this.apiKey, latencyMs: 50 };
  }

  estimateCost(inputTokens: number, outputTokens: number, model?: string): number {
    return (inputTokens + outputTokens) * 0.000002;
  }

  estimateLatency(model?: string): number {
    return 1000;
  }
}
