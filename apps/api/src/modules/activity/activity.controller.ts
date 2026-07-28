import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Query, Request } from '@nestjs/common';
import { ActivityService } from './activity.service';

@UseGuards(SupabaseGuard)
@Controller('activity')
export class ActivityController {
  constructor(@Inject(ActivityService) private readonly activityService: ActivityService) {}

  @Get()
  getRecentActivities(@Query('limit') limit: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.activityService.getRecentActivities(userId, limit ? parseInt(limit, 10) : 10);
  }
}
