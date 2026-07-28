import { Inject, Controller, Get, Patch, Body, UseGuards, Request, InternalServerErrorException, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseGuard } from '../auth/supabase.guard';
import { GetUserProfileQuery, UpdatePreferencesCommand } from '@voyageai/application';

@Controller('users')
@UseGuards(SupabaseGuard)
export class UserController {
  constructor(
    private readonly getUserProfileQuery: GetUserProfileQuery,
    private readonly updatePreferencesCommand: UpdatePreferencesCommand,
  ) {}

  @Get('me')
  async getProfile(@Request() req: { user: { userId: string } }) {
    const result = await this.getUserProfileQuery.execute(req.user.userId as never);
    
    if (result.isFailure) {
      if (result.error.name === 'NotFoundError') throw new NotFoundException(result.error.message);
      throw new InternalServerErrorException(result.error.message);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = result.value;

    return {
      data: value,
      meta: { timestamp: new Date().toISOString() },
    };
  }

  @Patch('preferences')
  async updatePreferences(@Request() req: { user: { userId: string } }, @Body() body: Record<string, unknown>) {
    // Note: Zod pipes should be used here in a full implementation
    const result = await this.updatePreferencesCommand.execute({
      userId: req.user.userId,
      ...body
    } as never);

    if (result.isFailure) {
      throw new BadRequestException(result.error.message);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = result.value;

    return {
      data: value,
      meta: { timestamp: new Date().toISOString() },
    };
  }
}
