import { PrismaModule } from './common/prisma/prisma.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { AIModule } from './modules/ai/ai.module';
import { envValidationSchema } from './config/env.validation';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { ExploreModule } from './modules/explore/explore.module';
import { TripsModule } from './modules/trips/trips.module';
import { PlannerModule } from './modules/planner/planner.module';
import { CollectionsModule } from './modules/collections/collections.module';
import { SavedPlacesModule } from './modules/saved-places/saved-places.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ActivityModule } from './modules/activity/activity.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
      cache: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // 100 requests per minute
    }]),
    TerminusModule,
    HealthModule,
    AuthModule,
    UserModule,
    AIModule,
    ExploreModule,
    TripsModule,
    PlannerModule,
    CollectionsModule,
    SavedPlacesModule,
    DashboardModule,
    ActivityModule,
    StatisticsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
