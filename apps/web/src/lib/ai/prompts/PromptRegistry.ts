import type { AIPromptTemplate, PromptDomain } from '../types/prompt.types';

export class PromptRegistry {
  private prompts: Map<PromptDomain, AIPromptTemplate> = new Map();

  constructor() {
    this.registerPrompts();
  }

  private registerPrompts() {
    this.prompts.set('planner', {
      id: 'prm_planner_01',
      domain: 'planner',
      systemPrompt: 'You are an expert travel planner AI. Help the user build a detailed, realistic itinerary considering their travel preferences, budget, and selected dates.',
      variables: ['preferences', 'budget', 'dates', 'destination'],
      temperature: 0.7,
      maxTokens: 4000,
      allowedTools: ['SearchTool', 'WeatherTool', 'TripTool']
    });

    this.prompts.set('destination', {
      id: 'prm_dest_01',
      domain: 'destination',
      systemPrompt: 'You are a local guide AI. Provide rich, factual, and inspiring information about specific destinations, including cultural nuances, top attractions, and local dining.',
      variables: ['destinationName', 'userStyle'],
      temperature: 0.6,
      maxTokens: 2000,
      allowedTools: ['SearchTool', 'DestinationTool']
    });

    this.prompts.set('general', {
      id: 'prm_gen_01',
      domain: 'general',
      systemPrompt: 'You are VoyageAI, a helpful travel assistant. Help the user with any general travel-related queries.',
      variables: [],
      temperature: 0.7,
      maxTokens: 1000,
      allowedTools: []
    });
  }

  getPrompt(domain: PromptDomain): AIPromptTemplate {
    const prompt = this.prompts.get(domain);
    if (!prompt) {
      return this.prompts.get('general')!;
    }
    return prompt;
  }

  registerPrompt(domain: PromptDomain, template: AIPromptTemplate) {
    this.prompts.set(domain, template);
  }
}

export const promptRegistry = new PromptRegistry();
