import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
@UseGuards(SupabaseGuard)
export class DashboardController {
  constructor(@Inject(DashboardService) private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboardData(@Request() req: any) {
    const userId = req.user.userId;
    return this.dashboardService.getDashboardData(userId);
  }
}
