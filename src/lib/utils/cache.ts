type CacheEntry<T> = {
  data: T;
  expiry: number;
};

const cacheStore = new Map<string, CacheEntry<any>>();

function getEndOfDayTimestamp() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

export async function cache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  expiry?: number,
): Promise<T> {
  const cached = cacheStore.get(key);

  if (cached && cached.expiry > Date.now()) {
    console.log(`[CACHE HIT] ${key}`);
    return cached.data;
  }

  console.log(`[CACHE MISS] ${key}`);

  const data = await fetchFn();

  cacheStore.set(key, {
    data,
    expiry: expiry ?? getEndOfDayTimestamp(),
  });

  return data;
}
