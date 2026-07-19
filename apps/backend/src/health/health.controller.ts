import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../common/supabase/supabase.service';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '../integrations/services/cache.service';

export interface HealthStatusData {
  status: string;
  database: string;
  supabase: string;
  redis: string;
  version: string;
  environment: string;
  timestamp: string;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  data: HealthStatusData;
}

@ApiTags('Health')
@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly supabase: SupabaseService,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve system connectivity and status metrics' })
  @ApiResponse({
    status: 200,
    description: 'System metrics and connection states',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
        message: { type: 'string', example: 'System is healthy' },
        data: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'ok' },
            database: { type: 'string', example: 'connected' },
            supabase: { type: 'string', example: 'connected' },
            redis: { type: 'string', example: 'connected' },
            version: { type: 'string', example: '1.0.0' },
            environment: { type: 'string', example: 'development' },
            timestamp: { type: 'string', example: '2026-06-26T18:00:00.000Z' },
          },
        },
      },
    },
  })
  async getHealth(): Promise<HealthCheckResponse> {
    let dbStatus = 'disconnected';
    let supabaseStatus = 'disconnected';
    let redisStatus = 'disconnected';
    let overallHealthy = true;

    // 1. Check Database connection
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      dbStatus = 'connected';
    } catch (error) {
      this.logger.error(`Database health check failed: ${error}`);
      overallHealthy = false;
    }

    // 2. Check Supabase connection
    try {
      const supabaseUrl = this.configService.get<string>('supabase.url');
      const response = await fetch(`${supabaseUrl}/auth/v1/health`);
      if (response.ok) {
        supabaseStatus = 'connected';
      } else {
        supabaseStatus = 'error_response';
        overallHealthy = false;
      }
    } catch (error) {
      this.logger.error(`Supabase health check failed: ${error}`);
      overallHealthy = false;
    }

    // 3. Check Redis connection via CacheService status
    if (this.cacheService.isConnected()) {
      redisStatus = 'connected';
    } else {
      redisStatus = 'disconnected';
      overallHealthy = false;
    }

    const healthData = {
      status: overallHealthy ? 'ok' : 'unhealthy',
      database: dbStatus,
      supabase: supabaseStatus,
      redis: redisStatus,
      version: '1.0.0',
      environment: this.configService.get<string>('environment', 'development'),
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      message: overallHealthy ? 'System is healthy' : 'System is degraded',
      data: healthData,
    };
  }
}
