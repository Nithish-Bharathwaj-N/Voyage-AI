import { Injectable, Logger } from '@nestjs/common';
import { AIProvider } from './types';

@Injectable()
export class GeminiProvider implements AIProvider {
  private readonly logger = new Logger(GeminiProvider.name);
  private apiKey: string;
  private defaultModel = 'gemini-1.5-pro';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      this.logger.warn('GEMINI_API_KEY is missing. GeminiProvider will fail if called.');
    }
  }

  async chat(prompt: string, context?: Record<string, unknown>): Promise<string> {
    this.logger.log(`Executing chat with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      return `[Gemini: ${this.defaultModel}] Mocked response for: "${prompt.substring(0, 20)}..."`;
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.defaultModel}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          ...context
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text: string }> } }> };
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (error) {
      this.logger.error(`Chat failed: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }

  async stream(prompt: string, onToken: (token: string) => void, _context?: Record<string, unknown>): Promise<void> {
    this.logger.log(`Executing stream with model ${this.defaultModel}`);
    
    if (!this.apiKey) {
      const words = `[Gemini: ${this.defaultModel}] Streaming mock response...`.split(' ');
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
    return { provider: 'gemini', model: this.defaultModel, maxTokens: 2097152 };
  }

  dispose(): void {
    // Cleanup if needed
  }
}
