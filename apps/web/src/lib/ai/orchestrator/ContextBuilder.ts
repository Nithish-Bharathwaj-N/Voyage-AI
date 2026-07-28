import type { AIContext } from '../types/ai.types';

export class ContextBuilder {
  async buildContext(): Promise<AIContext> {
    // In a real implementation, this would fetch from Zustand or the backend
    return {
      userId: 'usr_mock_1',
      preferences: {
        budget: 'moderate',
        dietary: ['vegetarian']
      },
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  formatForPrompt(context: AIContext): string {
    return JSON.stringify(context, null, 2);
  }
}

export const contextBuilder = new ContextBuilder();
