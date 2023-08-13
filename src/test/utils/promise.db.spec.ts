import { get, run, all } from '@/utils/promise.db';
import db from '@/db';

jest.mock('@/db', () => {
  return {
    get: jest.fn(),
    run: jest.fn(),
    all: jest.fn(),
  };
});

describe('promise.db', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('query', () => {
    it('should promisify get query', async () => {
      const mockGet = jest.fn().mockImplementationOnce((sql, params, cb) => {
        cb(null, 'data');
      });

      db.get = mockGet;

      const result = await get('SELECT 1', [1]);

      expect(mockGet).toBeCalledWith('SELECT 1', [1], expect.any(Function));
      expect(result).toBe('data');
    });
  });

  describe('run', () => {
    it('should promisify run query', async () => {
      const mockRun = jest.fn().mockImplementationOnce((sql, params, cb) => {
        cb(null, 'data');
      });

      db.run = mockRun;

      const result = await run('INSERT INTO table', [1]);

      expect(mockRun).toHaveBeenCalledWith('INSERT INTO table', [1], expect.any(Function));
      expect(result).toBe('data');
    });
  });

  describe('all', () => {
    it('should promisify all query', async () => {
      const mockAll = jest.fn().mockImplementationOnce((sql, params, cb) => {
        cb(null, ['row1', 'row2']);
      });

      db.all = mockAll;

      const result = await all('SELECT * FROM table', [1]);

      expect(mockAll).toHaveBeenCalledWith('SELECT * FROM table', [1], expect.any(Function));
      expect(result).toEqual(['row1', 'row2']);
    });
  });
});
