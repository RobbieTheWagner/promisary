import { describe, it, expect } from 'vitest';
import { hash } from './hash';

describe('hash', () => {
  it('resolves simple values', async () => {
    const input = { a: 1, b: 2 };
    const result = await hash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('resolves promises', async () => {
    const input = {
      a: Promise.resolve(1),
      b: Promise.resolve(2),
    };
    const result = await hash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('handles mixed values and promises', async () => {
    const input = {
      a: 1,
      b: Promise.resolve(2),
    };
    const result = await hash(input);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('rejects if any promise rejects', async () => {
    const input = {
      a: 1,
      b: Promise.reject(new Error('fail')),
    };
    await expect(hash(input)).rejects.toThrow('fail');
  });

  it('resolves to empty object for null or undefined', async () => {
    expect(await hash(null)).toEqual({});
    expect(await hash(undefined)).toEqual({});
  });
});
