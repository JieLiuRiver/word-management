import { User } from '@/interfaces/users.interface';
import { genPersonalKey } from '@/utils';
import { query, run } from '@/utils/promise.db';

class UserModel {
  /**
   * find user by name
   * @param username name
   * @returns user
   */
  async findUserByName(username: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE name = ?', [username]);
    if (!result) {
      return null;
    }
    return result as User;
  }

  /**
   * update user's psersonalkey, which means invalidate special user's token, only support opera by admin
   * @param username
   * @returns
   */
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
