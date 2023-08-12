import { genPersonalKey, withErrorMessagePrefix } from '@/utils/index';

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
