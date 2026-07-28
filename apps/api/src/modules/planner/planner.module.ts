import { Module } from '@nestjs/common';
import { PlannerController } from './planner.controller';
import { PlannerService } from './planner.service';

@Module({
  controllers: [PlannerController],
  providers: [PlannerService]
})
export class PlannerModule {}
