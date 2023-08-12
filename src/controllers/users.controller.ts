import { NextFunction, Request } from 'express';
import { User } from '@/interfaces/users.interface';
import { ApiResponse } from '@/interfaces/api.interface';

export class UserController {
  public getUsers = async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = [];
      res.apiSuccess(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };
}
