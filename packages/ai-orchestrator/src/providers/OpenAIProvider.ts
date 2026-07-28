import { IModelProvider, ModelResponse } from '../interfaces/IModelProvider';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Mock import
const OpenAI = require('openai').default;

export class OpenAIProvider implements IModelProvider {
  private openai: any;
  private readonly modelName = 'gpt-4o';

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('OpenAI API Key missing');
    this.openai = new OpenAI({ apiKey });
  }

  async generate(prompt: string, systemPrompt?: string): Promise<ModelResponse<string>> {
    const start = Date.now();
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    const completion = await this.openai.chat.completions.create({
      model: this.modelName,
      messages
    });

    return {
      data: completion.choices[0].message.content,
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens
      },
      latencyMs: Date.now() - start,
      provider: 'openai'
    };
  }

  async generateStructured<T>(prompt: string, schema: z.ZodType<T>, systemPrompt?: string): Promise<ModelResponse<T>> {
    const start = Date.now();
    const messages = [];
    if (systemPrompt) messages.push({ role: 'system', content: systemPrompt });
    messages.push({ role: 'user', content: prompt });

    // Using OpenAI's structured outputs via response_format schema
    const jsonSchema = zodToJsonSchema(schema, "mySchema");

    const completion = await this.openai.chat.completions.create({
      model: this.modelName,
      messages,
      response_format: { type: "json_object" } // Simplified for this implementation
    });

    const rawJson = JSON.parse(completion.choices[0].message.content);
    const parsedData = schema.parse(rawJson);

    return {
      data: parsedData,
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
        totalTokens: completion.usage.total_tokens
      },
      latencyMs: Date.now() - start,
      provider: 'openai'
    };
  }

  async healthCheck(): Promise<boolean> {
    return true;
  }

  async estimateTokens(prompt: string): Promise<number> {
    return Math.ceil(prompt.length / 4);
  }
}
