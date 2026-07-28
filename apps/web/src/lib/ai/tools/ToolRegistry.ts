import type { AITool } from '../types/tool.types';

export class ToolRegistry {
  private tools: Map<string, AITool> = new Map();

  constructor() {
    this.registerTools();
  }

  private registerTools() {
    this.tools.set('SearchTool', {
      name: 'SearchTool',
      description: 'Search the VoyageAI database for destinations, trips, or collections.',
      parameters: {
        query: { type: 'string', description: 'The search query', required: true }
      },
      validate: (args) => typeof args.query === 'string',
      execute: async (args) => {
        return { results: `Simulated search results for ${args.query}` };
      }
    });

    this.tools.set('WeatherTool', {
      name: 'WeatherTool',
      description: 'Get current weather and forecast for a specific location.',
      parameters: {
        location: { type: 'string', description: 'City name or coordinates', required: true }
      },
      validate: (args) => typeof args.location === 'string',
      execute: async (args) => {
        return { temp: '72F', condition: 'Sunny' };
      }
    });
  }

  getTool(name: string): AITool | undefined {
    return this.tools.get(name);
  }

  getAllTools(): AITool[] {
    return Array.from(this.tools.values());
  }
}

export const toolRegistry = new ToolRegistry();
