import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SupabaseService } from '../src/common/supabase/supabase.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { SupabaseAuthGuard } from '../src/auth/guards/supabase-auth.guard';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const mockUserId = 'd3b07384-d113-4956-a320-13e2f5e3f402';

  const mockAuthGuard = {
    canActivate: (context: ExecutionContext): boolean => {
      const req = context.switchToHttp().getRequest<Record<string, unknown>>();
      req.user = { id: mockUserId, email: 'traveler@example.com' };
      return true;
    },
  };

  const mockSupabaseClient = {
    storage: {
      from: jest.fn().mockReturnThis(),
      upload: jest.fn().mockResolvedValue({ data: {}, error: null }),
      remove: jest.fn().mockResolvedValue({ data: {}, error: null }),
      getPublicUrl: jest
        .fn()
        .mockReturnValue({ data: { publicUrl: 'https://example.com/avatars/new-avatar.png' } }),
      listBuckets: jest.fn().mockResolvedValue({ data: [{ name: 'avatars' }], error: null }),
    },
  };

  const mockSupabaseService = {
    getClient: jest.fn().mockReturnValue(mockSupabaseClient),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue(mockAuthGuard)
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

  beforeEach(async () => {
    // Reset databases and seed test profile
    await prisma.profile.deleteMany({});
    await prisma.user.deleteMany({});

    await prisma.user.create({
      data: {
        id: mockUserId,
        email: 'traveler@example.com',
        profile: {
          create: {
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Bio details',
            country: 'US',
            city: 'New York',
            language: 'en',
            currency: 'USD',
            timezone: 'America/New_York',
            profileCompletion: 20,
            isOnboarded: false,
          },
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /api/v1/profile', () => {
    it('should return 200 with profile data', async () => {
      const response = await request(app.getHttpServer()).get('/api/v1/profile').expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.firstName).toBe('John');
      expect(response.body.data.lastName).toBe('Doe');
      expect(response.body.data.isOnboarded).toBe(false);
    });
  });

  describe('PATCH /api/v1/profile', () => {
    it('should update profile and return 200', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/v1/profile')
        .send({
          bio: 'My updated traveler bio',
          city: 'Los Angeles',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.bio).toBe('My updated traveler bio');
      expect(response.body.data.city).toBe('Los Angeles');
      expect(response.body.data.profileCompletion).toBeGreaterThan(20);
    });

    it('should return 400 for validation errors', async () => {
      await request(app.getHttpServer())
        .patch('/api/v1/profile')
        .send({
          bio: 1234, // Must be string
        })
        .expect(400);
    });
  });

  describe('GET /api/v1/profile/preferences', () => {
    it('should retrieve travel preferences', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/profile/preferences')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.travelStyle).toBeNull();
      expect(response.body.data.favoriteActivities).toEqual([]);
    });
  });

  describe('PATCH /api/v1/profile/preferences', () => {
    it('should update travel preferences and return 200', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/v1/profile/preferences')
        .send({
          travelStyle: 'Adventure',
          budgetRange: 'Luxury',
          favoriteActivities: ['Scuba', 'Hiking'],
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.travelStyle).toBe('Adventure');
      expect(response.body.data.budgetRange).toBe('Luxury');
      expect(response.body.data.favoriteActivities).toEqual(['Scuba', 'Hiking']);
    });
  });

  describe('GET /api/v1/profile/onboarding', () => {
    it('should retrieve onboarding status', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/profile/onboarding')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isOnboarded).toBe(false);
    });
  });

  describe('PATCH /api/v1/profile/onboarding', () => {
    it('should update onboarding wizard status', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/v1/profile/onboarding')
        .send({ isOnboarded: true })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isOnboarded).toBe(true);
    });
  });

  describe('POST /api/v1/profile/avatar', () => {
    it('should upload avatar and update profileUrl', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/profile/avatar')
        .attach('file', Buffer.from('mock-file-content'), 'avatar.png')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.avatarUrl).toBe('https://example.com/avatars/new-avatar.png');

      const profile = await prisma.profile.findUnique({ where: { userId: mockUserId } });
      expect(profile?.avatarUrl).toBe('https://example.com/avatars/new-avatar.png');
    });

    it('should throw 400 bad request if file is missing', async () => {
      await request(app.getHttpServer()).post('/api/v1/profile/avatar').expect(400);
    });
  });

  describe('DELETE /api/v1/profile/avatar', () => {
    it('should delete existing avatar successfully', async () => {
      // Setup profile with avatar url first
      await prisma.profile.update({
        where: { userId: mockUserId },
        data: { avatarUrl: 'https://example.com/avatars/mock-avatar.png' },
      });

      const response = await request(app.getHttpServer())
        .delete('/api/v1/profile/avatar')
        .expect(200);

      expect(response.body.success).toBe(true);

      const profile = await prisma.profile.findUnique({ where: { userId: mockUserId } });
      expect(profile?.avatarUrl).toBeNull();
    });
  });
});
