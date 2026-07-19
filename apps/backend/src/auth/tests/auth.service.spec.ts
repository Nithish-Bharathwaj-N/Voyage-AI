import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { PrismaService } from '../../prisma/prisma.service';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockSupabaseClient = {
    auth: {
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      refreshSession: jest.fn(),
      resetPasswordForEmail: jest.fn(),
      updateUser: jest.fn(),
      setSession: jest.fn(),
      signInWithOAuth: jest.fn(),
      exchangeCodeForSession: jest.fn(),
      admin: {
        signOut: jest.fn(),
        deleteUser: jest.fn(),
      },
    },
  };

  const mockSupabaseService = {
    getClient: jest.fn().mockReturnValue(mockSupabaseClient),
  };

  const mockTransaction = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockPrismaService = {
    ...mockTransaction,
    $transaction: jest.fn((cb: (tx: typeof mockTransaction) => unknown) => cb(mockTransaction)),
  };

  const mockConfigService = {
    get: jest.fn((key: string, defaultValue?: unknown) => {
      if (key === 'supabase.url') return 'https://mock.supabase.co';
      if (key === 'environment') return 'test';
      return defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: SupabaseService, useValue: mockSupabaseService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should successfully sign up traveler in Supabase and sync Prisma DB profile', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };
      const mockSupabaseUser = { id: 'uuid-123', email: 'test@example.com' };

      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.register(registerDto);

      expect(result).toEqual({
        user: {
          id: 'uuid-123',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
        },
      });
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalledWith({
        email: registerDto.email,
        password: registerDto.password,
      });
    });

    it('should throw BadRequestException if Supabase returns signup error', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: null },
        error: { message: 'Invalid email' },
      });

      await expect(service.register(registerDto)).rejects.toThrow(BadRequestException);
    });

    it('should roll back Supabase user if database synchronization fails', async () => {
      const registerDto = {
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };
      const mockSupabaseUser = { id: 'uuid-123', email: 'test@example.com' };

      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });
      (mockPrismaService.$transaction as jest.Mock).mockRejectedValue(new Error('DB crash'));

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
      expect(mockSupabaseClient.auth.admin.deleteUser).toHaveBeenCalledWith('uuid-123');
    });
  });

  describe('login', () => {
    it('should successfully login and return access tokens', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123!' };
      const mockUser = { id: 'uuid-123', email: 'test@example.com' };
      const mockSession = {
        access_token: 'jwt-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null,
      });
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 'uuid-123',
        email: 'test@example.com',
      });

      const result = await service.login(loginDto);

      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'refresh-token',
        expiresIn: 3600,
        user: { id: 'uuid-123', email: 'test@example.com' },
      });
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'Password123!' };
      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid credentials' },
      });

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should call Supabase admin signOut', async () => {
      mockSupabaseClient.auth.admin.signOut.mockResolvedValue({ error: null });

      const result = await service.logout('uuid-123');

      expect(result).toEqual({});
      expect(mockSupabaseClient.auth.admin.signOut).toHaveBeenCalledWith('uuid-123');
    });
  });

  describe('refresh', () => {
    it('should rotate access tokens', async () => {
      const refreshDto = { refreshToken: 'old-refresh' };
      const mockSession = {
        access_token: 'new-jwt',
        refresh_token: 'new-refresh',
        expires_in: 3600,
      };

      mockSupabaseClient.auth.refreshSession.mockResolvedValue({
        data: { user: {}, session: mockSession },
        error: null,
      });

      const result = await service.refresh(refreshDto);

      expect(result).toEqual({
        accessToken: 'new-jwt',
        refreshToken: 'new-refresh',
        expiresIn: 3600,
      });
    });
  });
});
