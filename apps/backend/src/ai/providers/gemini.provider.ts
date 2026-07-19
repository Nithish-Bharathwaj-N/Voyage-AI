/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AiProvider, AiProviderOptions, ProviderHealth } from '../interfaces/ai-provider.interface';
import { HttpService } from '../../integrations/services/http.service';
import { ProviderUnavailableException } from '../../integrations/exceptions/provider-unavailable.exception';

@Injectable()
export class GeminiProvider implements AiProvider {
  private readonly logger = new Logger('GeminiProvider');
  private readonly apiKey: string | undefined;

  readonly name = 'gemini';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
  }

  async generateText(
    prompt: string,
    systemPrompt?: string,
    options?: AiProviderOptions,
  ): Promise<string> {
    if (!this.apiKey) {
      throw new ProviderUnavailableException(this.name, 'GEMINI_API_KEY is not configured');
    }

    const rawModel = options?.model || 'gemini-flash-latest';
    const model = rawModel.includes('gemini') ? rawModel : 'gemini-flash-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`;

    // Simplistic mapping for the abstraction.
    const contents: any[] = [];
    if (systemPrompt) {
      // Gemini expects system instructions in a specific format (for 1.5 models),
      // but to keep it simple, we prepend it or pass via system_instruction.
      // We will just prepend it to the prompt for this abstraction.
    }

    const combinedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    
    this.logger.debug(`[ROOT CAUSE ANALYSIS] Gemini Request Prompt: \n---BEGIN PROMPT---\n${combinedPrompt}\n---END PROMPT---`);
    contents.push({ role: 'user', parts: [{ text: combinedPrompt }] });

    const payload = {
      contents,
      generationConfig: {
        temperature: options?.temperature ?? 0.2,
        maxOutputTokens: options?.maxTokens ?? 8192,
        responseMimeType: 'application/json',
      },
    };

    const response = await this.httpService.request<any>(this.name, url, {
      method: 'POST',
      body: payload,
      timeoutMs: 60000, // LLM generation can take a long time
    });

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new ProviderUnavailableException(this.name, 'Received empty content from Gemini');
    }

    this.logger.debug(`[ROOT CAUSE ANALYSIS] Gemini Response Text: \n---BEGIN RESPONSE---\n${text}\n---END RESPONSE---`);

    return text;
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
    if (!this.apiKey) {
      throw new ProviderUnavailableException(this.name, 'GEMINI_API_KEY is not configured');
    }

    const rawModel = options?.model || 'gemini-flash-latest';
    const model = rawModel.includes('gemini') ? rawModel : 'gemini-flash-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${this.apiKey}`;

    const combinedPrompt = systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt;
    const contents = [{ role: 'user', parts: [{ text: combinedPrompt }] }];

    this.logger.debug(`[ROOT CAUSE ANALYSIS] Gemini Stream Request Prompt: \n---BEGIN PROMPT---\n${combinedPrompt}\n---END PROMPT---`);

    const payload = {
      contents,
      generationConfig: {
        temperature: options?.temperature ?? 0.2,
        maxOutputTokens: options?.maxTokens ?? 8192,
        responseMimeType: 'application/json',
      },
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok || !response.body) {
      const errText = await response.text();
      this.logger.error(`Gemini stream failed. Status: ${response.status}, Body: ${errText}`);
      throw new ProviderUnavailableException(this.name, `Failed to stream from Gemini: ${response.status} ${errText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.substring(6).trim();
          if (!dataStr) continue;
          
          try {
            const parsed = JSON.parse(dataStr);
            const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
            if (textChunk) {
              yield textChunk;
            }
          } catch (e) {
            // Ignore partial JSON parse errors if any, though SSE data chunks should be complete JSON objects
          }
        }
      }
    }
  }

  async embedText(text: string, options?: AiProviderOptions): Promise<number[]> {
    return [0.1, 0.2, 0.3]; // Stub
  }

  countTokens(text: string, model?: string): number {
    return Math.ceil(text.length / 4); // Basic approximation
  }

  async healthCheck(): Promise<ProviderHealth> {
    return { isHealthy: !!this.apiKey, latencyMs: 50 };
  }

  estimateCost(inputTokens: number, outputTokens: number, model?: string): number {
    return (inputTokens + outputTokens) * 0.000001; // Approx pricing
  }

  estimateLatency(model?: string): number {
    return 1500;
  }
}
