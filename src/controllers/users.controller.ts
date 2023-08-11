import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';

export class UserController {
  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = [];
      res.status(200).json({ data: findAllUsersData, message: 'get users successfully' });
    } catch (error) {
      next(error);
    }
  };
}
