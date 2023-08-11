import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { AuthService } from '@/services/auth.service';

export class AuthController {
  public auth = new AuthService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.body;
      const result = await this.auth.login(username);
      res.status(200).json({ result, message: 'logined successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout successfully' });
    } catch (error) {
      next(error);
    }
  };
}
