import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshDto } from '../dto/refresh.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SupabaseAuthGuard } from '../guards/supabase-auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { ValidatedUser } from '../strategies/supabase.strategy';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new traveler account' })
  @ApiResponse({
    status: 201,
    description: 'Traveler registered successfully. Email verification required.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd3b07384-d113-4956-a320-13e2f5e3f402' },
                email: { type: 'string', example: 'traveler@example.com' },
                firstName: { type: 'string', example: 'John' },
                lastName: { type: 'string', example: 'Doe' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request / Validation Failure',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Email is already registered' },
        error: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
          },
        },
      },
    },
  })
  async register(@Body() registerDto: RegisterDto): Promise<unknown> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate traveler with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successful authentication, session tokens returned.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'd7a987d6a78d...' },
            expiresIn: { type: 'number', example: 3600 },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd3b07384-d113-4956-a320-13e2f5e3f402' },
                email: { type: 'string', example: 'traveler@example.com' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Invalid login credentials' },
        error: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
          },
        },
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<unknown> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoke active user sessions and sign out' })
  @ApiResponse({
    status: 200,
    description: 'Session revoked successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: { type: 'object', example: {} },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid access token',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: false },
        message: { type: 'string', example: 'Access token is invalid or expired' },
        error: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
          },
        },
      },
    },
  })
  async logout(@CurrentUser() user: ValidatedUser): Promise<unknown> {
    return this.authService.logout(user.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate session tokens using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Tokens rotated successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'd7a987d6a78d...' },
            expiresIn: { type: 'number', example: 3600 },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token',
  })
  async refresh(@Body() refreshDto: RefreshDto): Promise<unknown> {
    return this.authService.refresh(refreshDto);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset verification email link' })
  @ApiResponse({
    status: 200,
    description: 'Instructions sent successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Password reset instructions sent to your email' },
          },
        },
      },
    },
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<unknown> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Commit new secure password' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Password updated successfully' },
          },
        },
      },
    },
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<unknown> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get('google')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve Google OAuth authentication URL' })
  @ApiResponse({
    status: 200,
    description: 'Google URL returned successfully.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            url: { type: 'string', example: 'https://accounts.google.com/o/oauth2/v2/auth...' },
          },
        },
      },
    },
  })
  async googleLogin(): Promise<unknown> {
    return this.authService.getGoogleRedirect();
  }

  @Get('google/callback')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle redirect callback for Google OAuth authentication' })
  @ApiQuery({ name: 'code', type: 'string', description: 'Authorization code from Google' })
  @ApiResponse({
    status: 200,
    description: 'OAuth authentication successful, session created.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'd7a987d6a78d...' },
            expiresIn: { type: 'number', example: 3600 },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd3b07384-d113-4956-a320-13e2f5e3f402' },
                email: { type: 'string', example: 'traveler@example.com' },
              },
            },
          },
        },
      },
    },
  })
  async googleCallback(@Query('code') code: string): Promise<unknown> {
    return this.authService.handleGoogleCallback(code);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(SupabaseAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Retrieve logged-in user profile status context details' })
  @ApiResponse({
    status: 200,
    description: 'Active traveler profile successfully returned.',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'Operation completed successfully' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'd3b07384-d113-4956-a320-13e2f5e3f402' },
            email: { type: 'string', example: 'traveler@example.com' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
          },
        },
      },
    },
  })
  async getMe(@CurrentUser() user: ValidatedUser): Promise<ValidatedUser> {
    return user;
  }
}
