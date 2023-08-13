import { NextFunction, Request } from 'express';
import { User } from '@/interfaces/users.interface';
import UsersModel from '@/models/users.model';
import { HttpException } from '@/exceptions/httpException';
import { omit, withErrorMessagePrefix } from '@/utils';
import type { ApiResponse } from '@/interfaces/api.interface';

export class UsersController {
  private usersModel = new UsersModel();

  public getUsers = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const datas = await this.usersModel.getUers();
      res.apiSuccess(datas.map(user => omit<User>(user, ['personalKey'])));
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user: User = await this.usersModel.getUserById(Number(id));
      if (!user) {
        throw new HttpException(409, withErrorMessagePrefix(`user ${id} is not found`));
      }
      res.apiSuccess(omit<User>(user, ['personalKey']));
    } catch (error) {
      next(error);
    }
  };
}
