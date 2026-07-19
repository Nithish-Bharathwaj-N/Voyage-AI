import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { SupabaseUserPayload } from '../interfaces/user-payload.interface';
import { PrismaService } from '../../prisma/prisma.service';

export interface ValidatedUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
}

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy, 'supabase-jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const jwtSecret = configService.get<string>('supabase.jwtSecret');
    if (!jwtSecret) {
      throw new Error('Supabase JWT Secret is not defined in the configuration.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Passport decodes and validates the signature/expiration.
   * If valid, this function runs and maps the payload to the request object context (req.user).
   */
  async validate(payload: SupabaseUserPayload): Promise<ValidatedUser> {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // Query database to ensure user profile exists locally
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { profile: true },
    });

    if (!user) {
      throw new UnauthorizedException('User profile does not exist locally.');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.profile?.firstName,
      lastName: user.profile?.lastName,
      avatarUrl: user.profile?.avatarUrl,
    };
  }
}
