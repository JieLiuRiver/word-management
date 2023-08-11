import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { UserModel } from '@/models/users.model';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

// @Service()
export class AuthService {
  public async login(userData: User): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = UserModel.find(user => user.name === userData.name);
    if (!findUser) throw new HttpException(409, `This name ${userData.name} was not found`);

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = UserModel.find(user => user.name === userData.name);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
