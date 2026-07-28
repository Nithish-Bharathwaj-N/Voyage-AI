import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Post, Request } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@UseGuards(SupabaseGuard)
@Controller('statistics')
export class StatisticsController {
  constructor(@Inject(StatisticsService) private readonly statisticsService: StatisticsService) {}

  @Get()
  getStatistics(@Request() req: any) {
    const userId = req.user.userId;
    return this.statisticsService.getStatistics(userId);
  }

  @Post('recalculate')
  recalculateStatistics(@Request() req: any) {
    const userId = req.user.userId;
    return this.statisticsService.recalculateStatistics(userId);
  }
}
