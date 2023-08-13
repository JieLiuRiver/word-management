import { genPersonalKey } from '@/utils';
import { EUserType } from '@/interfaces/users.interface';
import { get, run } from '@/utils/promise.db';
import CardModel from '@/models/cards.model';

const DEFAULT_ADMIN_NAME = 'Tom';
const DEFAULT_USER_NAME = 'Mary';
const DEFAULT_WORDS = ['Software Engineer', 'NodeJs', 'TypeScript'];

async function seedCards() {
  const card = new CardModel();
  const count = await card.getCount();

  if (count === 0) {
    DEFAULT_WORDS.reduce((calc, cur) => {
      return calc.then(() => card.createCard(cur));
    }, Promise.resolve());
  }
}

export async function seedUsers() {
  const count = await get('SELECT COUNT(*) FROM users');
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
