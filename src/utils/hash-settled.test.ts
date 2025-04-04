import { describe, it, expect } from 'vitest';
import { hashSettled } from './hash-settled';

describe('hashSettled', () => {
  it('resolves simple values', async () => {
    const input = { a: 1, b: 2 };
    const result = await hashSettled(input);
    expect(result).toEqual({
      a: { state: 'fulfilled', value: 1 },
      b: { state: 'fulfilled', value: 2 },
    });
  });

  it('resolves promises', async () => {
    const input = {
      a: Promise.resolve(1),
      b: Promise.resolve(2),
    };
    const result = await hashSettled(input);
    expect(result).toEqual({
      a: { state: 'fulfilled', value: 1 },
      b: { state: 'fulfilled', value: 2 },
    });
  });

  it('handles rejected promises', async () => {
    const input = {
      a: Promise.resolve(1),
      b: Promise.reject(new Error('fail')),
    };
    const result = await hashSettled(input);

    expect(result.a).toEqual({ state: 'fulfilled', value: 1 });

    if (result.b.state === 'rejected') {
      expect(result.b.reason).toBeInstanceOf(Error);
      expect(result.b.reason.message).toBe('fail');
    } else {
      throw new Error('Expected b to be rejected');
    }
  });

  it('handles null or undefined input', async () => {
    expect(await hashSettled(null)).toEqual({});
    expect(await hashSettled(undefined)).toEqual({});
  });
});
