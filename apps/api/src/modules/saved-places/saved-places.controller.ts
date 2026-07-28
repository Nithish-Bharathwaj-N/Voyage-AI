import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { SavedPlacesService } from './saved-places.service';

@UseGuards(SupabaseGuard)
@Controller('saved-places')
export class SavedPlacesController {
  constructor(@Inject(SavedPlacesService) private readonly savedPlacesService: SavedPlacesService) {}

  @Post()
  save(@Body() data: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.savedPlacesService.save(userId, data.destinationId, data.notes);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.userId;
    return this.savedPlacesService.findAll(userId);
  }

  @Delete(':destinationId')
  remove(@Param('destinationId') destinationId: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.savedPlacesService.remove(userId, destinationId);
  }
}
