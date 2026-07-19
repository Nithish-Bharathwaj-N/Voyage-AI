import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Register a new traveler.
   * Signs up the user in Supabase and syncs their profile locally in a PostgreSQL transaction.
   */
  async register(registerDto: RegisterDto): Promise<unknown> {
    const { email, password, firstName, lastName } = registerDto;

    const supabase = this.supabase.getClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error || !data.user) {
      this.logger.warn(
        `Failed registration attempt for email: ${email}. Reason: ${error?.message}`,
      );
      throw new BadRequestException(error?.message || 'Registration failed');
    }

    const userId = data.user.id;

    try {
      // Sync user profile using Prisma transaction
      await this.prisma.$transaction(async (tx) => {
        // Ensure no local duplicate user exists
        const existingUser = await tx.user.findUnique({
          where: { id: userId },
        });

        if (!existingUser) {
          await tx.user.create({
            data: {
              id: userId,
              email,
              profile: {
                create: {
                  firstName,
                  lastName,
                },
              },
            },
          });
        }
      });

      this.logger.log(`Successfully registered user: ${userId}`);
      return {
        user: {
          id: userId,
          email,
          firstName,
          lastName,
        },
      };
    } catch (dbError) {
      this.logger.error(`Database synchronization failed for user ${userId}: ${dbError}`);
      // If db sync fails, we clean up the created user in Supabase to preserve atomicity
      await supabase.auth.admin.deleteUser(userId);
      throw new ConflictException('User registration database synchronization failed');
    }
  }

  /**
   * Log in user with email & password.
   */
  async login(loginDto: LoginDto): Promise<unknown> {
    const { email, password } = loginDto;

    const supabase = this.supabase.getClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      this.logger.warn(`Failed login attempt for email: ${email}. Reason: ${error?.message}`);
      throw new UnauthorizedException(error?.message || 'Invalid credentials');
    }

    const userId = data.user.id;

    // Ensure database profile is synchronized (e.g. in case database seed was missing or user created out-of-band)
    try {
      const userRecord = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      });

      if (!userRecord) {
        // Recover and synchronize the profile from metadata
        const userMeta = data.user.user_metadata || {};
        await this.prisma.user.create({
          data: {
            id: userId,
            email,
            profile: {
              create: {
                firstName: userMeta.firstName || 'Traveler',
                lastName: userMeta.lastName || 'User',
              },
            },
          },
        });
      }
    } catch (syncError) {
      this.logger.error(`Database profile check failed on login for ${userId}: ${syncError}`);
    }

    this.logger.log(`Successful login for user: ${userId}`);

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
      user: {
        id: userId,
        email: data.user.email,
      },
    };
  }

  /**
   * Log out active session.
   */
  async logout(userId: string): Promise<unknown> {
    const supabase = this.supabase.getClient();
    const { error } = await supabase.auth.admin.signOut(userId);

    if (error) {
      this.logger.error(
        `Failed logout session revocation for user: ${userId}. Error: ${error.message}`,
      );
      throw new BadRequestException(error.message);
    }

    this.logger.log(`Revoked active session tokens and logged out user: ${userId}`);
    return {};
  }

  /**
   * Rotate access and refresh tokens.
   */
  async refresh(refreshDto: RefreshDto): Promise<unknown> {
    const { refreshToken } = refreshDto;

    const supabase = this.supabase.getClient();
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || !data.user || !data.session) {
      this.logger.warn('Failed token rotation attempt using invalid refresh token');
      throw new UnauthorizedException(error?.message || 'Session refresh failed');
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
    };
  }

  /**
   * Request password reset link.
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<unknown> {
    const { email } = forgotPasswordDto;

    const supabase = this.supabase.getClient();
    const redirectToUrl = `${this.configService.get<string>('SUPABASE_URL')}/auth/v1/verify`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectToUrl,
    });

    if (error) {
      this.logger.error(
        `Failed password reset request for email: ${email}. Error: ${error.message}`,
      );
      throw new BadRequestException(error.message);
    }

    this.logger.log(`Password reset link dispatched to email: ${email}`);
    return {
      message: 'Password reset instructions sent to your email',
    };
  }

  /**
   * Update password using the active session token.
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<unknown> {
    const { password, token } = resetPasswordDto;
    const supabase = this.supabase.getClient();

    // If an access token/OTP is supplied, establish auth session first
    if (token) {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: token,
        refresh_token: '',
      });
      if (sessionError) {
        this.logger.warn(`Failed reset password session token setup: ${sessionError.message}`);
        throw new BadRequestException('Invalid or expired reset token');
      }
    }

    const { data, error } = await supabase.auth.updateUser({
      password,
    });

    if (error || !data.user) {
      this.logger.error(`Failed to update password for reset. Error: ${error?.message}`);
      throw new BadRequestException(error?.message || 'Password update failed');
    }

    this.logger.log(`Password updated successfully for user: ${data.user.id}`);
    return {
      message: 'Password updated successfully',
    };
  }

  /**
   * Returns Google OAuth redirection link configuration details.
   */
  async getGoogleRedirect(): Promise<unknown> {
    const supabase = this.supabase.getClient();
    const callbackUrl = `${this.configService.get<string>('SUPABASE_URL')}/auth/v1/callback`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (error || !data.url) {
      throw new BadRequestException(
        error?.message || 'Google OAuth initial link generation failed',
      );
    }

    return {
      url: data.url,
    };
  }

  /**
   * Exchanging OAuth authorization codes for session tokens.
   */
  async handleGoogleCallback(code: string): Promise<unknown> {
    const supabase = this.supabase.getClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user || !data.session) {
      this.logger.warn(`Google OAuth login code exchange failed. Error: ${error?.message}`);
      throw new UnauthorizedException(error?.message || 'OAuth exchange failed');
    }

    const userId = data.user.id;
    const email = data.user.email || '';
    const userMeta = data.user.user_metadata || {};

    // Sync database
    try {
      await this.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { id: userId },
        });

        if (!existingUser) {
          await tx.user.create({
            data: {
              id: userId,
              email,
              profile: {
                create: {
                  firstName: userMeta.full_name?.split(' ')[0] || userMeta.given_name || 'Traveler',
                  lastName:
                    userMeta.full_name?.split(' ').slice(1).join(' ') ||
                    userMeta.family_name ||
                    'User',
                  avatarUrl: userMeta.avatar_url,
                },
              },
            },
          });
        }
      });
    } catch (syncError) {
      this.logger.error(
        `Database synchronization error for Google OAuth user: ${userId}. Error: ${syncError}`,
      );
    }

    this.logger.log(`Successful Google OAuth login for user: ${userId}`);

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
      expiresIn: data.session.expires_in,
      user: {
        id: userId,
        email,
      },
    };
  }
}
