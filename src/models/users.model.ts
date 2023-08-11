import { User } from '@/interfaces/users.interface';
import db from '@/db';

class UserModel {
  async getAllUsers() {
    return db.query('SELECT * FROM users');
  }
}

export default UserModel;
