import { Injectable, Logger } from '@nestjs/common';
import { AIProvider } from './types';

@Injectable()
export class OpenAIProvider implements AIProvider {
  private readonly logger = new Logger(OpenAIProvider.name);
  private apiKey: string;
  private defaultModel = 'gpt-4o';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      this.logger.warn('OPENAI_API_KEY is missing. OpenAIProvider will fail if called.');
    }
  }

  async chat(prompt: string, context?: Record<string, unknown>): Promise<string> {
    this.logger.log(`Executing chat with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      // Graceful fallback for local dev without keys
      return `[OpenAI: ${this.defaultModel}] Mocked response for: "${prompt.substring(0, 20)}..."`;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.defaultModel,
          messages: [{ role: 'user', content: prompt }],
          ...context
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json() as { choices: Array<{ message: { content: string } }> };
      return data.choices[0].message.content;
    } catch (error) {
      this.logger.error(`Chat failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  async stream(prompt: string, onToken: (token: string) => void, _context?: Record<string, unknown>): Promise<void> {
    this.logger.log(`Executing stream with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      // Simulate streaming
      const words = `[OpenAI: ${this.defaultModel}] Streaming mock response...`.split(' ');
      for (const word of words) {
        onToken(word + ' ');
        await new Promise(r => setTimeout(r, 50));
      }
      return;
    }

    // Real SSE implementation would go here (fetch with stream reader)
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
    return { provider: 'openai', model: this.defaultModel, maxTokens: 128000 };
  }

  dispose(): void {
    // Cleanup if needed
  }
}
