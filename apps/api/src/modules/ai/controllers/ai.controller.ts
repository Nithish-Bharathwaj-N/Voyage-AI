import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { PlannerAIService } from '../services/PlannerAIService';
import { AssistantAIService } from '../services/AssistantAIService';

@Controller('ai')
export class AIController {
  constructor(
    @Inject(PlannerAIService) private readonly plannerService: PlannerAIService,
    @Inject(AssistantAIService) private readonly assistantService: AssistantAIService
  ) {}

  @Post('planner/generate')
  async generatePlan(@Body() body: { sessionId: string; inputData: Record<string, unknown> }) {
    const rawJson = await this.plannerService.generatePlan(body.sessionId, body.inputData);
    try {
      return JSON.parse(rawJson);
    } catch {
      // If the AI didn't return perfect JSON, return the raw string
      return { raw: rawJson, error: 'Invalid JSON' };
    }
  }

  @Post('assistant/chat')
  async chat(@Body() body: { sessionId: string; message: string; context: Record<string, unknown> }) {
    const response = await this.assistantService.processChat(
      body.sessionId, 
      body.message, 
      body.context
    );
    return { response };
  }

  @Get('health')
  async health() {
    return { status: 'ok', service: 'AI Module' };
  }
}
