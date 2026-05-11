interface CacheEntry<T> {
  data: T;
  expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

const cleanup = (): void => {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now > entry.expiry) {
      cache.delete(key);
    }
  }
};

export const reportCache = {
  get<T>(id: string): T | null {
    const entry = cache.get(id);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      cache.delete(id);
      return null;
    }

    return entry.data;
  },

  set<T>(id: string, data: T, ttlMs: number = DEFAULT_TTL): void {
    const expiry = Date.now() + ttlMs;
    cache.set(id, { data, expiry });

    // Optional: Periodic cleanup if the cache grows too large
    if (cache.size > 1000) {
      cleanup();
    }
  }
};
