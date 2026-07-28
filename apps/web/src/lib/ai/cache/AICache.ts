export class AICache {
  private cache: Map<string, unknown> = new Map();

  async get<T>(key: string): Promise<T | null> {
    return (this.cache.get(key) as T) || null;
  }

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    this.cache.set(key, value);
    if (ttlSeconds) {
      setTimeout(() => {
        this.cache.delete(key);
      }, ttlSeconds * 1000);
    }
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }
}

export const aiCache = new AICache();
