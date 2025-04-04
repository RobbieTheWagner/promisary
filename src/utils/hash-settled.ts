type SettledResult<T> =
  | { state: 'fulfilled'; value: T }
  | { state: 'rejected'; reason: any };

export async function hashSettled<T extends Record<string, any>>(
  obj: T | null | undefined
): Promise<{ [K in keyof T]: SettledResult<Awaited<T[K]>> }> {
  if (obj == null) return {} as any;
  const entries = Object.entries(obj);
  const settledEntries = await Promise.all(
    entries.map(async ([key, value]) => {
      try {
        const resolved = await value;
        return [key, { state: 'fulfilled', value: resolved }] as const;
      } catch (error) {
        return [key, { state: 'rejected', reason: error }] as const;
      }
    })
  );
  return Object.fromEntries(settledEntries);
}
