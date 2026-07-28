export class RedisCacheManager {
  // In a real implementation, this wraps ioredis
  // For the vertical slice proving architecture, we will simulate a rapid in-memory map
  // since the actual Redis cluster requires infra spin-up. The interface remains the same.
  private cache = new Map<string, { value: any, expiresAt: number }>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttlSeconds * 1000)
    });
  }

  async invalidate(pattern: string): Promise<void> {
    // Basic prefix matching for invalidation
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key);
      }
    }
  }
}
