export async function hash<T extends Record<string, any>>(
  obj: T | null | undefined
): Promise<{ [K in keyof T]: Awaited<T[K]> }> {
  if (obj == null) return {} as any;
  const entries = Object.entries(obj);
  const resolvedEntries = await Promise.all(
    entries.map(async ([key, value]) => {
      return [key, await value];
    })
  );
  return Object.fromEntries(resolvedEntries);
}
