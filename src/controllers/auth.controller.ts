import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';
import UserModel from '@/models/users.model';
import { HttpException } from '@/exceptions/httpException';
import jwtService from '@/services/jwt.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class AuthController {
  private userModel = new UserModel();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.body;
      const foundUser: User = await this.userModel.findUserByName(username);
      if (!foundUser) throw new HttpException(409, `This username ${username} was not found`);
      const token = jwtService.sign({ id: foundUser.id, name: foundUser.name }, foundUser.personalKey);
      res.status(200).json({ data: { token, userInfo: { id: foundUser.id, name: foundUser.name, type: foundUser.type } }, code: 0 });
    } catch (error) {
      next(error);
    }
  };

  public revokeToken = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.body;
      await this.userModel.updateUserPersonalkey(username);
      res.status(200).json({ data: null, code: 0 });
    } catch (error) {
      next(error);
    }
  };
}
