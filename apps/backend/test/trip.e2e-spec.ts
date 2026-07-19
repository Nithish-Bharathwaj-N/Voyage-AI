import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, ExecutionContext } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { SupabaseAuthGuard } from '../src/auth/guards/supabase-auth.guard';
import { CollaboratorRole, TripVisibility, TripStatus } from '@prisma/client';

describe('TripController (e2e)', () => {
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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(SupabaseAuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    prisma = app.get<PrismaService>(PrismaService);
    await app.init();

    // Setup seed user
    await prisma.tripMember.deleteMany({});
    await prisma.trip.deleteMany({});
    await prisma.user.deleteMany({
      where: { id: { in: [mockUserId, '50e0477f-1d48-43d9-b003-87a1d355047b'] } },
    });

    await prisma.user.create({
      data: {
        id: mockUserId,
        email: 'traveler@example.com',
      },
    });
  });

  afterAll(async () => {
    // Cleanup seed database changes
    await prisma.tripMember.deleteMany({});
    await prisma.trip.deleteMany({});
    await prisma.user.deleteMany({
      where: { id: { in: [mockUserId, '50e0477f-1d48-43d9-b003-87a1d355047b'] } },
    });
    await app.close();
  });

  let createdTripId: string;
  let createdDestId: string;
  let createdActId: string;
  let memberId: string;

  describe('Trips E2E Flows', () => {
    it('POST /api/v1/trips - should create a trip and register OWNER', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/trips')
        .send({
          title: 'E2E Paris Tour',
          description: 'Testing trip creation flows',
          startDate: '2026-07-01T00:00:00.000Z',
          endDate: '2026-07-10T00:00:00.000Z',
          visibility: TripVisibility.PRIVATE,
          currency: 'USD',
          estimatedBudget: 3000,
          country: 'France',
          city: 'Paris',
          timezone: 'Europe/Paris',
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('E2E Paris Tour');
      createdTripId = response.body.data.id;
    });

    it('GET /api/v1/trips - should return trips list containing created trip', async () => {
      const response = await request(app.getHttpServer()).get('/api/v1/trips').expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.some((t: { id: string }) => t.id === createdTripId)).toBe(true);
    });

    it('GET /api/v1/trips/:id - should return detailed trip payload', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/v1/trips/${createdTripId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdTripId);
    });

    it('PATCH /api/v1/trips/:id - should update details successfully', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/v1/trips/${createdTripId}`)
        .send({
          title: 'E2E Updated Paris Tour',
          status: TripStatus.ONGOING,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('E2E Updated Paris Tour');
      expect(response.body.data.status).toBe(TripStatus.ONGOING);
    });

    it('POST /api/v1/trips/:id/archive - should set isArchived to true', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/trips/${createdTripId}/archive`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.isArchived).toBe(true);
    });

    it('POST /api/v1/trips/:id/duplicate - should clone trip, destinations, and activities', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/trips/${createdTripId}/duplicate`)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toContain('Copy');

      // Clean duplicate trip
      await prisma.trip.delete({ where: { id: response.body.data.id } });
    });

    it('POST /api/v1/trips/:id/invite - should generate pending invitation', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/trips/${createdTripId}/invite`)
        .send({
          inviteeEmail: 'invited_friend@example.com',
          role: CollaboratorRole.EDITOR,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.inviteeEmail).toBe('invited_friend@example.com');
    });
  });

  describe('Destinations & Activities E2E Flows', () => {
    it('POST /api/v1/trips/:id/destinations - should add destination to trip', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/trips/${createdTripId}/destinations`)
        .send({
          name: 'Louvre Museum',
          latitude: 48.8606,
          longitude: 2.3376,
          order: 1,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Louvre Museum');
      createdDestId = response.body.data.id;
    });

    it('GET /api/v1/trips/:id/destinations - should list destinations', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/v1/trips/${createdTripId}/destinations`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].id).toBe(createdDestId);
    });

    it('PATCH /api/v1/destinations/:id - should update destination details', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/v1/destinations/${createdDestId}`)
        .send({
          name: 'Louvre Art Palace',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Louvre Art Palace');
    });

    it('POST /api/v1/destinations/:id/activities - should add activity to destination', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/destinations/${createdDestId}/activities`)
        .send({
          name: 'View Mona Lisa',
          cost: 15,
          order: 1,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('View Mona Lisa');
      createdActId = response.body.data.id;
    });

    it('GET /api/v1/destinations/:id/activities - should list activities', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/v1/destinations/${createdDestId}/activities`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].id).toBe(createdActId);
    });

    it('PATCH /api/v1/activities/:id - should update activity details', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/api/v1/activities/${createdActId}`)
        .send({
          cost: 18,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.cost).toBe(18);
    });

    it('DELETE /api/v1/activities/:id - should remove activity', async () => {
      await request(app.getHttpServer()).delete(`/api/v1/activities/${createdActId}`).expect(200);

      // Verify removal
      const list = await request(app.getHttpServer())
        .get(`/api/v1/destinations/${createdDestId}/activities`)
        .expect(200);
      expect(list.body.data.length).toBe(0);
    });

    it('DELETE /api/v1/destinations/:id - should remove destination', async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/destinations/${createdDestId}`)
        .expect(200);

      // Verify removal
      const list = await request(app.getHttpServer())
        .get(`/api/v1/trips/${createdTripId}/destinations`)
        .expect(200);
      expect(list.body.data.length).toBe(0);
    });
  });

  describe('Collaborators Removal Flow', () => {
    beforeAll(async () => {
      // Seed a test collaborator
      const testCollabUser = await prisma.user.upsert({
        where: { email: 'collab@example.com' },
        update: {},
        create: {
          id: '50e0477f-1d48-43d9-b003-87a1d355047b',
          email: 'collab@example.com',
        },
      });

      const member = await prisma.tripMember.create({
        data: {
          tripId: createdTripId,
          userId: testCollabUser.id,
          role: CollaboratorRole.EDITOR,
        },
      });
      memberId = member.id;
    });

    it('DELETE /api/v1/trips/:id/member/:memberId - should remove member successfully', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/api/v1/trips/${createdTripId}/member/${memberId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('Cleanup trip E2E', () => {
    it('DELETE /api/v1/trips/:id - should delete trip successfully', async () => {
      await request(app.getHttpServer()).delete(`/api/v1/trips/${createdTripId}`).expect(200);
    });
  });
});
