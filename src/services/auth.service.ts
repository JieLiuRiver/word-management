import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import UserModel from '@/models/users.model';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { name: user.name };
  const expiresIn = '1d';
  return {
    token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }),
  };
};

export class AuthService {
  private userModel = new UserModel();

  public async login(username: string): Promise<{ user: User; token: string }> {
    const findUser: User = await this.userModel.findUserByName(username);
    if (!findUser) throw new HttpException(409, `This username ${username} was not found`);
    const { token } = createToken(findUser);
    return { user: findUser, token };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = this.userModel.find(user => user.name === userData.name);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
