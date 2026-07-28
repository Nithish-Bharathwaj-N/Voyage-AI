import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, HttpHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  check() {
    return { status: 'ok', message: 'VoyageAI API is running' };
  }

  @Get('live')
  @HealthCheck()
  checkLiveness() {
    // Check if process is alive and memory is under 150MB roughly (or any arbitrary limit for liveness)
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  checkReadiness() {
    // In a real scenario we'd check DB and Redis
    // For now we check if basic HTTP resolution works for external dependencies
    return this.health.check([
      () => this.http.pingCheck('internet', 'https://1.1.1.1'),
    ]);
  }
}
