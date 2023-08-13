import { User } from '@/interfaces/users.interface';
import { genPersonalKey } from '@/utils';
import { query, run, all } from '@/utils/promise.db';

class UserModel {
  /**
   * get users
   * @returns Users[]
   */
  async getUers(): Promise<User[]> {
    const datas = await all('SELECT * FROM users');
    return (datas || []) as User[];
  }

  /**
   * get user by id
   * @param userid
   * @returns User
   */
  async getUserById(userid: number): Promise<User | null> {
    const data = await query('SELECT * FROM users WHERE id = ?', [userid]);
    if (!data) {
      return null;
    }
    return data as User;
  }

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
   * update user's psersonalkey
   * @param userid
   * @returns
   */
  async updateUserPersonalkey(userid: number): Promise<void> {
    const result = await run(
      `
      UPDATE users
      SET personalKey = ? WHERE id = ?
    `,
      [await genPersonalKey(), userid],
    );

    return result as Promise<void>;
  }
}

export default UserModel;
