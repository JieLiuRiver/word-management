import { genPersonalKey } from '@/utils';
import { EUserType } from '@/interfaces/users.interface';
import { query, run } from '@/utils/promise.db';

const DEFAULT_ADMIN_NAME = 'Tom';
const DEFAULT_USER_NAME = 'Mary';

async function seed() {
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

seed();
