import { Module } from '@nestjs/common';
import { AiController } from './controllers/ai.controller';
import { AiPlannerService } from './services/ai-planner.service';
import { PlannerContextOrchestrator } from './services/planner-context.service';
import { PlannerPromptBuilder } from './services/planner-prompt-builder.service';
import { ItineraryEnricher } from './services/itinerary-enricher.service';
import { AiProviderManager } from './services/ai-provider-manager.service';
import { AiProviderRegistry } from './services/ai-provider-registry.service';
import { AiRouterService } from './services/ai-router.service';
import { ItineraryValidatorService } from './services/itinerary-validator.service';
import { ItineraryRepairService } from './services/itinerary-repair.service';
import { TripOptimizerService } from './services/trip-optimizer.service';
import { AiChatService } from './services/ai-chat.service';
import { LocalProvider } from './providers/local.provider';
import { OpenAiProvider } from './providers/openai.provider';
import { ClaudeProvider } from './providers/claude.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { DeepSeekProvider } from './providers/deepseek.provider';
import { OpenRouterProvider } from './providers/openrouter.provider';
import { IntegrationsModule } from '../integrations/integrations.module';
import { GeoIntelligenceService } from './services/geo-intelligence.service';
import { RankingEngineService } from './services/ranking-engine.service';
import { IntelligenceLayersService } from './services/intelligence-layers.service';
import { SeasonalEngineService } from './services/seasonal-engine.service';
import { RouteOptimizerService } from './services/route-optimizer.service';
import { UserProfileService } from './services/user-profile.service';
import { DynamicReplannerService } from './services/dynamic-replanner.service';

@Module({
  imports: [IntegrationsModule],
  controllers: [AiController],
  providers: [
    // Pipeline services
    AiPlannerService,
    PlannerContextOrchestrator,
    PlannerPromptBuilder,
    ItineraryEnricher,
    // Provider infrastructure
    AiProviderManager,
    AiProviderRegistry,
    AiRouterService,
    // Validation
    ItineraryValidatorService,
    ItineraryRepairService,
    TripOptimizerService,
    GeoIntelligenceService,
    RankingEngineService,
    IntelligenceLayersService,
    SeasonalEngineService,
    RouteOptimizerService,
    UserProfileService,
    DynamicReplannerService,
    AiChatService,
    // AI Providers
    LocalProvider,
    OpenAiProvider,
    ClaudeProvider,
    GeminiProvider,
    DeepSeekProvider,
    OpenRouterProvider,
  ],
  exports: [AiPlannerService, ItineraryValidatorService, TripOptimizerService],
})
export class AiModule {}
