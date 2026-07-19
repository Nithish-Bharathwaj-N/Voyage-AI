import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { IntegrationsModule } from '../integrations/integrations.module';

@Module({
  imports: [IntegrationsModule],
  controllers: [HealthController],
})
export class HealthModule {}
