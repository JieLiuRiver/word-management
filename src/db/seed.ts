import { genPersonalKey } from '@/utils';
import { EUserType } from '@/interfaces/users.interface';
import { query, run } from '@/utils/promise.db';

const DEFAULT_ADMIN_NAME = 'Tom';
const DEFAULT_USER_NAME = 'Mary';
const DEFAULT_WORDS = ['Software Engineer', 'NodeJs', 'TypeScript'];

async function seedCards() {
  const count = await query('SELECT COUNT(*) FROM cards');

  if (count['COUNT(*)'] === 0) {
    await run('INSERT INTO cards (word) VALUES (?),(?),(?)', DEFAULT_WORDS);
  }
}

export async function seedUsers() {
  const count = await query('SELECT COUNT(*) FROM users');
  if (count?.['COUNT(*)'] === 0) {
    await run(
      `
      INSERT INTO users (name, type, personalKey)
      VALUES (?, ?, ?), (?, ?, ?)
    `,
      [DEFAULT_ADMIN_NAME, EUserType.ADMIN, await genPersonalKey(), DEFAULT_USER_NAME, EUserType.USER, await genPersonalKey()],
    );
  }
}

async function seed() {
  await seedUsers();
  await seedCards();
}

seed();
