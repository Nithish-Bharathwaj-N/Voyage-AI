import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SupabaseAuthGuard extends AuthGuard('supabase-jwt') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer mock-session-jwt-token')) {
      const mockUserId = 'e8006e86-fe67-4c5f-8515-50e9af6cdbef';
      const mockEmail = 'local@example.com';

      // Auto-sync mock user profile dynamically in local PostgreSQL if missing
      let user = await this.prisma.user.findUnique({
        where: { id: mockUserId },
        include: { profile: true },
      });

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            id: mockUserId,
            email: mockEmail,
            profile: {
              create: {
                firstName: 'Local',
                lastName: 'Tester',
              },
            },
          },
          include: { profile: true },
        });
      }

      // Inject request user context to bypass passport strategy check
      request.user = {
        id: user.id,
        email: user.email,
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        avatarUrl: user.profile?.avatarUrl,
      };

      return true;
    }

    const result = await super.canActivate(context);
    return result as boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  handleRequest(err: any, user: any, info: any): any {
    if (err || !user) {
      throw new UnauthorizedException(info?.message || 'Access token is invalid or expired');
    }
    return user;
  }
}
