import { NextFunction, Request } from 'express';
import { User } from '@/interfaces/users.interface';
import UserModel from '@/models/users.model';
import { HttpException } from '@/exceptions/httpException';
import jwtService from '@/services/jwt.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { omit, withErrorMessagePrefix } from '@/utils';
import type { ApiResponse } from '@/interfaces/api.interface';

export class AuthController {
  private userModel = new UserModel();

  // users login
  public login = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { username } = req.body;
      const foundUser: User = await this.userModel.findUserByName(username);
      if (!foundUser) throw new HttpException(409, withErrorMessagePrefix(`this username ${username} was not found`));
      const token = jwtService.sign({ id: foundUser.id, name: foundUser.name }, foundUser.personalKey);
      res.apiSuccess({ token, userInfo: omit<User>(foundUser, ['personalKey']) });
    } catch (error) {
      next(error);
    }
  };

  // revoke token, only admin can use
  public revokeToken = async (req: RequestWithUser, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { userid } = req.body;
      await this.userModel.updateUserPersonalkey(userid);
      res.apiSuccess(null);
    } catch (error) {
      next(error);
    }
  };
}
