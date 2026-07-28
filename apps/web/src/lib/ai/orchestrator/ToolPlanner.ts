import { toolRegistry } from '../tools/ToolRegistry';
import type { PipelinePayload } from './PipelineTypes';
import type { AITool } from '../types/tool.types';

export class ToolPlanner {
  async plan(payload: PipelinePayload): Promise<PipelinePayload> {
    const allowedTools = payload.promptTemplate?.allowedTools || [];
    
    // In a sophisticated system, this might use a cheap LLM call to pre-filter tools
    // For now, we simply fetch the tool definitions from the registry based on the prompt's allowed list
    const plannedTools = allowedTools
      .map(toolName => toolRegistry.getTool(toolName))
      .filter(Boolean) as AITool[];

    return {
      ...payload,
      plannedTools,
    };
  }
}

export const toolPlanner = new ToolPlanner();
