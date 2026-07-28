import { Injectable, Logger } from '@nestjs/common';
import { AIProvider } from './types';

@Injectable()
export class AnthropicProvider implements AIProvider {
  private readonly logger = new Logger(AnthropicProvider.name);
  private apiKey: string;
  private defaultModel = 'claude-3-5-sonnet-20240620';

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
    if (!this.apiKey) {
      this.logger.warn('ANTHROPIC_API_KEY is missing. AnthropicProvider will fail if called.');
    }
  }

  async chat(prompt: string, context?: Record<string, unknown>): Promise<string> {
    this.logger.log(`Executing chat with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      return `[Anthropic: ${this.defaultModel}] Mocked response for: "${prompt.substring(0, 20)}..."`;
    }

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.defaultModel,
          max_tokens: 4096,
          messages: [{ role: 'user', content: prompt }],
          ...context
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`);
      }

      const data = await response.json() as { content: Array<{ text: string }> };
      return data.content[0].text;
    } catch (error) {
      this.logger.error(`Chat failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  async stream(prompt: string, onToken: (token: string) => void, _context?: Record<string, unknown>): Promise<void> {
    this.logger.log(`Executing stream with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      const words = `[Anthropic: ${this.defaultModel}] Streaming mock response...`.split(' ');
      for (const word of words) {
        onToken(word + ' ');
        await new Promise(r => setTimeout(r, 50));
      }
      return;
    }

    throw new Error('Real streaming implementation pending SSE setup');
  }

  async health(): Promise<boolean> {
    return !!this.apiKey;
  }

  supportsTools(): boolean {
    return true;
  }

  supportsVision(): boolean {
    return true;
  }

  supportsStreaming(): boolean {
    return true;
  }

  modelMetadata(): Record<string, unknown> {
    return { provider: 'anthropic', model: this.defaultModel, maxTokens: 200000 };
  }

  dispose(): void {
    // Cleanup if needed
  }
}
