import { IModelProvider, ModelResponse } from '../interfaces/IModelProvider';
import { z } from 'zod';

const Anthropic = require('@anthropic-ai/sdk').default;

export class ClaudeProvider implements IModelProvider {
  private anthropic: any;
  private readonly modelName = 'claude-3-5-sonnet-20240620';

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('Anthropic API Key missing');
    this.anthropic = new Anthropic({ apiKey });
  }

  async generate(prompt: string, systemPrompt?: string): Promise<ModelResponse<string>> {
    const start = Date.now();
    const msg = await this.anthropic.messages.create({
      model: this.modelName,
      max_tokens: 1024,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: prompt }]
    });

    return {
      data: msg.content[0].text,
      usage: {
        promptTokens: msg.usage.input_tokens,
        completionTokens: msg.usage.output_tokens,
        totalTokens: msg.usage.input_tokens + msg.usage.output_tokens
      },
      latencyMs: Date.now() - start,
      provider: 'claude'
    };
  }

  async generateStructured<T>(prompt: string, schema: z.ZodType<T>, systemPrompt?: string): Promise<ModelResponse<T>> {
    // Claude structured output usually relies on Tool calling (JSON schemas)
    // For this boilerplate, we simulate passing the schema string to Claude and parsing its XML/JSON
    const start = Date.now();
    const augmentedPrompt = `${prompt}\n\nYou must return your response as RAW JSON that adheres to this schema:\n${JSON.stringify(schema, null, 2)}`;
    
    const msg = await this.anthropic.messages.create({
      model: this.modelName,
      max_tokens: 1024,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: augmentedPrompt }]
    });

    const rawJson = JSON.parse(msg.content[0].text);
    const parsedData = schema.parse(rawJson);

    return {
      data: parsedData,
      usage: {
        promptTokens: msg.usage.input_tokens,
        completionTokens: msg.usage.output_tokens,
        totalTokens: msg.usage.input_tokens + msg.usage.output_tokens
      },
      latencyMs: Date.now() - start,
      provider: 'claude'
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async estimateTokens(prompt: string): Promise<number> {
    return Math.ceil(prompt.length / 4);
  }
}
