import { aiCache } from './AICache';
import type { AIPromptTemplate } from '../types/prompt.types';

export class PromptCache {
  private getPrefix(domain: string): string {
    return `prompt:${domain}`;
  }

  async getPrompt(domain: string): Promise<AIPromptTemplate | null> {
    return aiCache.get<AIPromptTemplate>(this.getPrefix(domain));
  }

  async setPrompt(domain: string, prompt: AIPromptTemplate): Promise<void> {
    await aiCache.set(this.getPrefix(domain), prompt, 86400); // 24 hours
  }
}

export const promptCache = new PromptCache();
