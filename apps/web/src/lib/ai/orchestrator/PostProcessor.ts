import type { PipelinePayload } from './PipelineTypes';

export class PostProcessor {
  async process(payload: PipelinePayload): Promise<PipelinePayload> {
    let content = payload.parsedContent || payload.providerResponse?.content || '';
    
    // Example: Clean up malformed markdown, append citations, or trigger UI side-effects
    content = content.trim();

    return {
      ...payload,
      postProcessedContent: content
    };
  }
}

export const postProcessor = new PostProcessor();
