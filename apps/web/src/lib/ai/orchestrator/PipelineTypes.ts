import type { AIContext } from '../types/ai.types';
import type { AIPromptTemplate } from '../types/prompt.types';
import type { AITool } from '../types/tool.types';
import type { AIProviderResponse } from '../types/provider.types';

export interface PipelinePayload {
  conversationId: string;
  originalQuery: string;
  domain: string;
  assistantMessageId: string;
  
  // Accumulated data
  context?: AIContext;
  promptTemplate?: AIPromptTemplate;
  plannedTools?: AITool[];
  providerResponse?: AIProviderResponse;
  parsedContent?: string;
  postProcessedContent?: string;
  
  onUpdate?: (content: string) => void;
}
