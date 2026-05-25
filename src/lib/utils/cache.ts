type CacheEntry<T> = {
  data?: T;
  promise?: Promise<T>;
  expiry: number;
};

const globalForCache = globalThis as unknown as {
  cacheStore: Map<string, CacheEntry<unknown>>;
};

const cacheStore = globalForCache.cacheStore ?? new Map<string, CacheEntry<unknown>>();

if (process.env.NODE_ENV !== 'production') globalForCache.cacheStore = cacheStore;

export async function cache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  expiry: number,
): Promise<T> {
  const cached = cacheStore.get(key);

  if (cached) {
    if (cached.data !== undefined && cached.expiry > Date.now()) {
      return cached.data as T;
    }

    if (cached.promise) {
      return cached.promise as Promise<T>;
    }
  }

  const promise = fetchFn();

  cacheStore.set(key, {
    promise,
    expiry,
  });

  try {
    const data = await promise;

    cacheStore.set(key, {
      data,
      expiry,
    });

    return data;
  } catch (e) {
    cacheStore.delete(key);
    throw e;
  }
}
