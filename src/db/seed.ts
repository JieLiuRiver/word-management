import db from './index';
import { EUserType } from '@/interfaces/users.interface';

const DEFAULT_ADMIN_NAME = 'Tom';
const DEFAULT_USER_NAME = 'Mary';

async function seed() {
  const count = await db.get('SELECT COUNT(*) FROM users');
  if (!count) {
    db.run(`
        INSERT INTO users (name, type)
        VALUES (${DEFAULT_ADMIN_NAME}, ${EUserType.ADMIN}), (${DEFAULT_USER_NAME}, ${EUserType.USER})
      `);
  }
}

seed();
