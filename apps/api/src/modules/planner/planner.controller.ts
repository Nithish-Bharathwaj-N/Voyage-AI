import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { PlannerService } from './planner.service';

@UseGuards(SupabaseGuard)
@Controller('planner')
export class PlannerController {
  constructor(@Inject(PlannerService) private readonly plannerService: PlannerService) {}

  @Get(':tripId')
  getPlanner(@Param('tripId') tripId: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.plannerService.getPlanner(tripId, userId);
  }

  @Post(':tripId/days')
  addOrUpdateDays(@Param('tripId') tripId: string, @Body() daysDto: any[], @Request() req: any) {
    const userId = req.user.userId;
    return this.plannerService.addOrUpdateDays(tripId, userId, daysDto);
  }

  @Post(':tripId/activities')
  addActivity(@Param('tripId') tripId: string, @Body() activityDto: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.plannerService.addActivity(tripId, userId, activityDto);
  }

  @Patch(':tripId/activities/:activityId')
  updateActivity(
    @Param('tripId') tripId: string,
    @Param('activityId') activityId: string,
    @Body() activityDto: any,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    return this.plannerService.updateActivity(tripId, activityId, userId, activityDto);
  }

  @Delete(':tripId/activities/:activityId')
  removeActivity(
    @Param('tripId') tripId: string,
    @Param('activityId') activityId: string,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    return this.plannerService.removeActivity(tripId, activityId, userId);
  }
}
