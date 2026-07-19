import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AiPlannerService } from './src/ai/services/ai-planner.service';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const aiService = app.get(AiPlannerService);

  const destinations = ['Tokyo', 'Paris', 'Kerala', 'Dubai', 'Swiss Alps', 'New York', 'Iceland', 'Bali'];
  
  const report = {
    total: destinations.length,
    success: 0,
    failures: 0,
    details: [] as any[]
  };

  for (const dest of destinations) {
    console.log(`Generating for ${dest}...`);
    try {
      const itinerary = await aiService.planTrip({
        destination: dest,
        startDate: '2026-10-01',
        endDate: '2026-10-03',
        budget: 1500,
        travelerCount: 2,
        travelStyle: 'Cultural',
        currency: 'USD'
      }, 'gemini', 'test-user');
      
      let activitiesFound = 0;
      let missingCoords = 0;
      let missingImages = 0;
      let missingPlaceData = 0;
      
      if (itinerary && itinerary.days) {
        itinerary.days.forEach((day: any) => {
          if (day.activities) {
            activitiesFound += day.activities.length;
            day.activities.forEach((act: any) => {
              if (!act.coordinates || act.coordinates.latitude === 0) missingCoords++;
              if (!act.image) missingImages++;
              if (!act.rating && !act.priceLevel) missingPlaceData++;
            });
          }
        });
      }

      report.success++;
      report.details.push({
        destination: dest,
        status: 'OK',
        heroImage: !!itinerary.heroImage,
        days: itinerary.days?.length,
        activities: activitiesFound,
        missingCoords,
        missingImages,
        missingPlaceData
      });
      
    } catch (e: any) {
      console.error(`Error for ${dest}:`, e.message);
      report.failures++;
      report.details.push({
        destination: dest,
        status: 'ERROR',
        error: e.message
      });
    }
  }

  console.log(JSON.stringify(report, null, 2));
  fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));
  await app.close();
}
bootstrap();
