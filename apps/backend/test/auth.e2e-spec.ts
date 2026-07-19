import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SupabaseService } from '../src/common/supabase/supabase.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(SupabaseService)
      .useValue(mockSupabaseService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/v1/auth/register', () => {
    it('should register a user successfully and sync to db', async () => {
      const payload = {
        email: 'traveler@example.com',
        password: 'Password123!',
        firstName: 'John',
        lastName: 'Doe',
      };

      const mockSupabaseUser = { id: 'd3b07384-d113-4956-a320-13e2f5e3f402', email: payload.email };
      mockSupabaseClient.auth.signUp.mockResolvedValue({
        data: { user: mockSupabaseUser },
        error: null,
      });

      // Mock database operations
      jest
        .spyOn(prisma, '$transaction')
        .mockImplementation(async (cb: (tx: unknown) => Promise<unknown>) => {
          return cb(prisma);
        });
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.user, 'create').mockResolvedValue({
        id: 'd3b07384-d113-4956-a320-13e2f5e3f402',
        email: payload.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as unknown as import('@prisma/client').User);

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(payload)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.id).toBe('d3b07384-d113-4956-a320-13e2f5e3f402');
      expect(mockSupabaseClient.auth.signUp).toHaveBeenCalled();
    });

    it('should return 400 bad request if validation fails', async () => {
      const payload = {
        email: 'invalid-email',
        password: '123',
        firstName: '',
        lastName: 'Doe',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send(payload)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should authenticate user and return tokens', async () => {
      const payload = {
        email: 'traveler@example.com',
        password: 'Password123!',
      };

      const mockSession = {
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
      };
      const mockSupabaseUser = { id: 'd3b07384-d113-4956-a320-13e2f5e3f402', email: payload.email };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: mockSupabaseUser, session: mockSession },
        error: null,
      });

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        id: 'd3b07384-d113-4956-a320-13e2f5e3f402',
        email: payload.email,
      } as unknown as import('@prisma/client').User);

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBe('access-token');
      expect(response.body.data.refreshToken).toBe('refresh-token');
    });

    it('should fail with 401 unauthorized on bad credentials', async () => {
      const payload = {
        email: 'traveler@example.com',
        password: 'WrongPassword!',
      };

      mockSupabaseClient.auth.signInWithPassword.mockResolvedValue({
        data: { user: null, session: null },
        error: { message: 'Invalid login credentials' },
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(payload)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Invalid login credentials');
    });
  });

  describe('POST /api/v1/auth/refresh', () => {
    it('should rotate access token successfully', async () => {
      const payload = { refreshToken: 'old-refresh' };
      const mockSession = {
        access_token: 'new-access',
        refresh_token: 'new-refresh',
        expires_in: 3600,
      };

      mockSupabaseClient.auth.refreshSession.mockResolvedValue({
        data: { user: {}, session: mockSession },
        error: null,
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/refresh')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBe('new-access');
    });
  });

  describe('POST /api/v1/auth/forgot-password', () => {
    it('should trigger password reset email successfully', async () => {
      const payload = { email: 'traveler@example.com' };
      mockSupabaseClient.auth.resetPasswordForEmail.mockResolvedValue({ error: null });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/forgot-password')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.message).toContain('sent');
    });
  });

  describe('POST /api/v1/auth/reset-password', () => {
    it('should commit new password successfully', async () => {
      const payload = { password: 'NewPassword123!', token: 'access-token' };
      mockSupabaseClient.auth.setSession.mockResolvedValue({ error: null });
      mockSupabaseClient.auth.updateUser.mockResolvedValue({
        data: { user: { id: 'uuid' } },
        error: null,
      });

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/reset-password')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.message).toContain('updated');
    });
  });

  describe('GET /api/v1/auth/google', () => {
    it('should return Google OAuth url', async () => {
      mockSupabaseClient.auth.signInWithOAuth.mockResolvedValue({
        data: { provider: 'google', url: 'https://google.com/oauth' },
        error: null,
      });

      const response = await request(app.getHttpServer()).get('/api/v1/auth/google').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.url).toBe('https://google.com/oauth');
    });
  });
});
