import { Module } from '@nestjs/common';
import { AIController } from './controllers/ai.controller';
import { AIGateway } from './gateways/ai.gateway';
import { ProviderFactory } from './providers/ProviderFactory';
import { OpenAIProvider } from './providers/OpenAIProvider';
import { GeminiProvider } from './providers/GeminiProvider';
import { AnthropicProvider } from './providers/AnthropicProvider';
import { AIOrchestrator } from './services/AIOrchestrator';
import { PlannerAIService } from './services/PlannerAIService';
import { AssistantAIService } from './services/AssistantAIService';

@Module({
  controllers: [AIController],
  providers: [
    AIGateway,
    ProviderFactory,
    OpenAIProvider,
    GeminiProvider,
    AnthropicProvider,
    AIOrchestrator,
    PlannerAIService,
    AssistantAIService
  ],
  exports: [
    AIOrchestrator,
    PlannerAIService,
    AssistantAIService
  ]
})
export class AIModule {}
