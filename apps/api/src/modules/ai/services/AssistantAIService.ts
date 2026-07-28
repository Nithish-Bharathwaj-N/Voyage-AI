import { Injectable, Logger, Inject } from '@nestjs/common';
import { AIOrchestrator } from './AIOrchestrator';

@Injectable()
export class AssistantAIService {
  private readonly logger = new Logger(AssistantAIService.name);

  constructor(@Inject(AIOrchestrator) private readonly orchestrator: AIOrchestrator) {}

  public async processChat(
    sessionId: string, 
    message: string,
    context: Record<string, unknown>,
    onStreamToken?: (token: string) => void
  ): Promise<string> {
    this.logger.log(`Processing chat for session: ${sessionId}`);

    const systemPrompt = `You are a conversational AI Travel Assistant.
User intent: ${context.command}
Recent Context: ${JSON.stringify(context.messages)}
Current Plan Modified: ${context.planModified}

User Message: ${message}

Provide a helpful, concise response confirming the changes or answering the user's question. Use Markdown.`;

    if (onStreamToken) {
      let fullResponse = '';
      await this.orchestrator.executeStream(systemPrompt, (token) => {
        fullResponse += token;
        onStreamToken(token);
      }, { temperature: 0.8 });
      return fullResponse;
    } else {
      return this.orchestrator.execute(systemPrompt, { temperature: 0.8 });
    }
  }
}
