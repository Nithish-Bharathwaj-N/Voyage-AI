import { Injectable, Logger, Inject } from '@nestjs/common';
import { AIOrchestrator } from './AIOrchestrator';

@Injectable()
export class PlannerAIService {
  private readonly logger = new Logger(PlannerAIService.name);

  constructor(@Inject(AIOrchestrator) private readonly orchestrator: AIOrchestrator) {}

  public async generatePlan(
    sessionId: string, 
    inputData: Record<string, unknown>,
    onStreamToken?: (token: string) => void
  ): Promise<string> {
    this.logger.log(`Generating plan for session: ${sessionId}`);

    const systemPrompt = `You are an expert AI Travel Planner. Generate a highly detailed, JSON formatted trip plan for the following criteria:
${JSON.stringify(inputData, null, 2)}

Return ONLY valid JSON matching the AITripPlan schema. Do not wrap in markdown blocks.`;

    if (onStreamToken) {
      let fullResponse = '';
      await this.orchestrator.executeStream(systemPrompt, (token) => {
        fullResponse += token;
        onStreamToken(token);
      }, { temperature: 0.7 });
      return fullResponse;
    } else {
      return this.orchestrator.execute(systemPrompt, { temperature: 0.7 });
    }
  }
}
