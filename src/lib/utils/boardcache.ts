import { DailyPuzzle } from "@prisma/client";

type CacheEntry = {
  data: DailyPuzzle;
  expiry: number;
};

const boardCache = new Map<string, CacheEntry>();

function getEndOfDayTimestamp() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return end.getTime();
}

export async function getCachedCurrentBoard(
  date: string,
  boardSize: string,
  fetchFromDB: () => Promise<DailyPuzzle>
): Promise<DailyPuzzle> {
  const key = `${date}_${boardSize}`;

  const cached = boardCache.get(key);

  if (cached && cached.expiry > Date.now()) {
    console.log(`[CACHE HIT] ${key}`);
    return cached.data;
  }

  console.log(`[CACHE MISS] ${key}`);

  const board = await fetchFromDB();

  boardCache.set(key, {
    data: board,
    expiry: getEndOfDayTimestamp(),
  });

  return board;
}