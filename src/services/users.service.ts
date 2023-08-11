import { User } from '@/interfaces/users.interface';
import UserModel from '@/models/users.model';

export class UserService {
  private userModel = new UserModel();
  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.userModel.getAllUsers();
    return users;
  }
}
