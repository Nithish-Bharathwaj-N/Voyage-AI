import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TripsService } from './trips.service';

@UseGuards(SupabaseGuard)
@Controller('trips')
export class TripsController {
  constructor(@Inject(TripsService) private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.create(createTripDto, userId);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.update(id, userId, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.remove(id, userId);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.duplicate(id, userId);
  }

  @Post(':id/archive')
  archive(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.tripsService.archive(id, userId);
  }
}
