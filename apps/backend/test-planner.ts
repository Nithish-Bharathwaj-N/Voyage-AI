import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AiPlannerService } from './src/ai/services/ai-planner.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiService = app.get(AiPlannerService);
  
  const itinerary = await aiService.planTrip({
    destination: 'Tokyo',
    startDate: '2026-10-01',
    endDate: '2026-10-02',
    budget: 1000,
    travelerCount: 2,
    travelStyle: 'Cultural',
    currency: 'USD'
  }, 'gemini', 'test-user');
  
  console.log(JSON.stringify(itinerary, null, 2));
  await app.close();
}
bootstrap();
