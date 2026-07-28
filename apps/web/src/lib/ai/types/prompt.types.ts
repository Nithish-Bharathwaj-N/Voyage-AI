export type PromptDomain = 'planner' | 'destination' | 'budget' | 'general' | 'trip-planner' | 'packing' | 'restaurants' | 'weather' | 'trip' | 'recommendations' | 'collections' | 'profile';

export interface AIPromptTemplate {
  id: string;
  domain: PromptDomain;
  systemPrompt: string;
  variables: string[];
  examples?: { user: string; assistant: string }[];
  temperature?: number;
  maxTokens?: number;
  allowedTools?: string[];
}
