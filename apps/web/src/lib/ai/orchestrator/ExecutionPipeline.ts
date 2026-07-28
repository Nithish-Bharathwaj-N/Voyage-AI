import { contextBuilder } from './ContextBuilder';
import { promptRegistry } from '../prompts/PromptRegistry';
import { toolPlanner } from './ToolPlanner';
import { providerFactory } from '../providers/ProviderFactory';
import { responseParser } from './ResponseParser';
import { postProcessor } from './PostProcessor';
import { conversationManager } from './ConversationManager';
import { streamManager } from './StreamManager';
import type { PipelinePayload } from './PipelineTypes';
import type { PromptDomain } from '../types/prompt.types';

export class ExecutionPipeline {
  async execute(
    conversationId: string, 
    query: string, 
    assistantMessageId: string,
    domain: PromptDomain,
    onUpdate?: (content: string) => void
  ): Promise<void> {
    
    let payload: PipelinePayload = {
      conversationId,
      originalQuery: query,
      domain,
      assistantMessageId,
      onUpdate
    };

    try {
      // 1. Context Builder
      payload.context = await contextBuilder.buildContext();

      // 2. Prompt Registry
      payload.promptTemplate = promptRegistry.getPrompt(domain as PromptDomain);

      // 3. Tool Planner
      payload = await toolPlanner.plan(payload);

      // 4. Provider Execution (Handles streaming intrinsically)
      const provider = providerFactory.getActiveProvider();
      const messagesPayload = [
        payload.promptTemplate?.systemPrompt || '', 
        payload.context, 
        payload.originalQuery
      ];

      if (provider.capabilities.supportsStreaming && payload.onUpdate) {
        await conversationManager.updateMessageStatus(payload.conversationId, payload.assistantMessageId, 'streaming');
        streamManager.startStream(payload.assistantMessageId);
        
        let fullContent = '';
        
        payload.providerResponse = await provider.stream(
          messagesPayload,
          payload.plannedTools,
          (chunk) => {
            if (streamManager.handleChunk(payload.assistantMessageId, chunk, (c) => {
              fullContent += c;
              if (payload.onUpdate) payload.onUpdate(fullContent);
            })) {
              // chunk handled
            }
          }
        );
        
        // Ensure final content is captured in the payload
        payload.providerResponse.content = fullContent;
        
      } else {
        payload.providerResponse = await provider.chat(messagesPayload, payload.plannedTools);
      }

      // 5. Response Parser
      const parsed = responseParser.parseComponents(payload.providerResponse.content);
      payload.parsedContent = parsed.text;

      // 6. Post Processor
      payload = await postProcessor.process(payload);

      // 7. Conversation Manager (Finalize)
      await conversationManager.updateMessageStatus(
        payload.conversationId, 
        payload.assistantMessageId, 
        'completed', 
        payload.postProcessedContent
      );

    } catch (error) {
      console.error('Pipeline execution failed:', error);
      await conversationManager.updateMessageStatus(
        payload.conversationId, 
        payload.assistantMessageId, 
        'failed', 
        'Sorry, I encountered an error processing your request.'
      );
    }
  }
}

export const executionPipeline = new ExecutionPipeline();
