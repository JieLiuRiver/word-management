import { User } from '@/interfaces/users.interface';
import { genPersonalKey } from '@/utils';
import { query, run } from '@/utils/promise.db';

class UserModel {
  async findUserByName(username: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE name = ?', [username]);
    if (!result) {
      return null;
    }
    return result as User;
  }

  async updateUserPersonalkey(username: string): Promise<void> {
    const result = await run(
      `
      UPDATE users
      SET personalKey = ? WHERE name = ?
    `,
      [await genPersonalKey(), username],
    );

    return result as Promise<void>;
  }
}

export default UserModel;
