import { run, get, all } from '@/utils/promise.db';

describe('db', () => {
  beforeEach(async () => {
    await run('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
  });

  afterEach(async () => {
    await run('DROP TABLE test');
  });

  it('should insert new record', async () => {
    await run('INSERT INTO test (name) VALUES (?)', 'foo');

    const result = await get('SELECT name FROM test WHERE id = ?', 1);

    expect(result.name).toBe('foo');
  });

  it('should get all records', async () => {
    await run('INSERT INTO test (name) VALUES (?)', 'foo');
    await run('INSERT INTO test (name) VALUES (?)', 'bar');

    const result = await all('SELECT * FROM test');

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('foo');
    expect(result[1].name).toBe('bar');
  });
});
