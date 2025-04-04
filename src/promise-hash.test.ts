import { describe, it, expect } from 'vitest';
import { promiseHash } from './promise-hash';

describe('promiseHash', () => {
  it('resolves simple values', async () => {
    const input = { a: 1, b: 2 };
    const result = await promiseHash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('resolves promises', async () => {
    const input = {
      a: Promise.resolve(1),
      b: Promise.resolve(2),
    };
    const result = await promiseHash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('handles mixed values and promises', async () => {
    const input = {
      a: 1,
      b: Promise.resolve(2),
    };
    const result = await promiseHash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('rejects if any promise rejects', async () => {
    const input = {
      a: 1,
      b: Promise.reject(new Error('fail')),
    };
    await expect(promiseHash(input)).rejects.toThrow('fail');
  });

  it('resolves to empty object for null or undefined', async () => {
    expect(await promiseHash(null)).toEqual({});
    expect(await promiseHash(undefined)).toEqual({});
  });
});
