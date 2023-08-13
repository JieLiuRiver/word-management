import { genPersonalKey, withErrorMessagePrefix, omit } from '@/utils/index';

describe('genPersonalKey', () => {
  it('should generate a personal key', async () => {
    const key = await genPersonalKey();
    expect(key).toBeDefined();
    expect(key.length).toBeGreaterThan(0);
  });
});

describe('withErrorMessagePrefix', () => {
  it('should add error message prefix', () => {
    const message = 'Invalid username';
    const result = withErrorMessagePrefix(message);
    expect(result).toBe('Ooops, Invalid username');
  });
});

describe('omit', () => {
  it('omits specified props', () => {
    const source = {
      name: 'John',
      age: 30,
      city: 'New York',
    };

    const result = omit(source, ['age']);

    expect(result).toEqual({
      name: 'John',
      city: 'New York',
    });
  });

  it('handles empty props array', () => {
    const source = { name: 'John' };
    const result = omit(source, []);

    expect(result).toEqual({ name: 'John' });
  });

  it('returns partial source when no props specified', () => {
    const source = { name: 'John' };
    const result = omit(source);

    expect(result).toEqual({ name: 'John' });
  });

  it('handles non-existing props', () => {
    const source = { name: 'John' };
    const result = omit(source, ['age']);

    expect(result).toEqual({ name: 'John' });
  });
});
