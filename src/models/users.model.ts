import { User } from '@/interfaces/users.interface';
import { query } from '@/utils/promise.db';

class UserModel {
  async findUserByName(name: string): Promise<User | null> {
    const result = await query('SELECT * FROM users WHERE name = ?', [name]);
    if (!result) {
      return null;
    }
    return result as User;
  }
}

export default UserModel;
