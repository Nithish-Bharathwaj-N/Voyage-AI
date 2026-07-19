import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

/**
 * Generic Redis cache wrapper.
 *
 * Provides type-safe get/set/del/delByPattern methods with TTL support.
 * Only provider response DTOs are cached — never business domain objects.
 */
@Injectable()
export class CacheService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CacheService.name);
  private client: Redis;
  private connected = false;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const redisUrl = this.configService.get<string>('redis.url');
    if (!redisUrl) {
      this.logger.warn('REDIS_URL not configured — CacheService will operate in no-op mode');
      return;
    }

    this.client = new Redis(redisUrl, {
      connectTimeout: 3000,
      maxRetriesPerRequest: 2,
      lazyConnect: true,
    });

    this.client.on('connect', () => {
      this.connected = true;
      this.logger.log('CacheService connected to Redis');
    });

    this.client.on('error', (err: Error) => {
      this.connected = false;
      this.logger.error(`CacheService Redis error: ${err.message}`);
    });

    void this.client.connect();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.logger.log('CacheService disconnected from Redis');
    }
  }

  /**
   * Retrieve a cached value by key.
   * Returns null if key is missing, cache is unavailable, or deserialization fails.
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.connected || !this.client) return null;
    try {
      const raw = await this.client.get(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      this.logger.warn(`Cache get failed for key "${key}": ${(err as Error).message}`);
      return null;
    }
  }

  /**
   * Store a value in cache with a TTL in seconds.
   */
  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    if (!this.connected || !this.client) return;
    try {
      const serialized = JSON.stringify(value);
      await this.client.setex(key, ttlSeconds, serialized);
    } catch (err) {
      this.logger.warn(`Cache set failed for key "${key}": ${(err as Error).message}`);
    }
  }

  /**
   * Delete a specific key from cache.
   */
  async del(key: string): Promise<void> {
    if (!this.connected || !this.client) return;
    try {
      await this.client.del(key);
    } catch (err) {
      this.logger.warn(`Cache del failed for key "${key}": ${(err as Error).message}`);
    }
  }

  /**
   * Delete all keys matching a glob-style pattern (e.g. "weather:*").
   * Uses SCAN to avoid blocking the Redis event loop.
   */
  async delByPattern(pattern: string): Promise<number> {
    if (!this.connected || !this.client) return 0;
    let cursor = '0';
    let deletedCount = 0;

    try {
      do {
        const [nextCursor, keys] = await this.client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
        cursor = nextCursor;
        if (keys.length > 0) {
          await this.client.del(...keys);
          deletedCount += keys.length;
        }
      } while (cursor !== '0');
    } catch (err) {
      this.logger.warn(
        `Cache delByPattern failed for pattern "${pattern}": ${(err as Error).message}`,
      );
    }

    return deletedCount;
  }

  /**
   * Check whether the Redis connection is active.
   */
  isConnected(): boolean {
    return this.connected;
  }

  /**
   * Build a namespaced cache key.
   * Ensures consistent key formatting across all providers.
   *
   * @example CacheService.buildKey('weather', 'current', '48.8584', '2.2945')
   * => "weather:current:48.8584:2.2945"
   */
  static buildKey(...parts: string[]): string {
    return parts.join(':');
  }
}
