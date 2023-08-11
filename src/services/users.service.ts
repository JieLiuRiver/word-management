import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';

export class UserService {
  public async findAllUser(): Promise<User[]> {
    const users: User[] = UserModel;
    return users;
  }
}
