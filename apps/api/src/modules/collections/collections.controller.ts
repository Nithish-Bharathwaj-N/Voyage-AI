import { SupabaseGuard } from '../auth/supabase.guard';
import { Inject, UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { CollectionsService } from './collections.service';

@UseGuards(SupabaseGuard)
@Controller('collections')
export class CollectionsController {
  constructor(@Inject(CollectionsService) private readonly collectionsService: CollectionsService) {}

  @Post()
  create(@Body() data: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.create(userId, data);
  }

  @Get()
  findAll(@Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.findAll(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.update(id, userId, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.remove(id, userId);
  }

  @Post(':id/destinations')
  addDestination(@Param('id') id: string, @Body('destinationId') destId: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.addDestination(id, destId, userId);
  }

  @Delete(':id/destinations/:destinationId')
  removeDestination(@Param('id') id: string, @Param('destinationId') destId: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.collectionsService.removeDestination(id, destId, userId);
  }
}
