import { Module } from '@nestjs/common';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';

@Module({
  controllers: [ExploreController],
  providers: [ExploreService],
})
export class ExploreModule {}
