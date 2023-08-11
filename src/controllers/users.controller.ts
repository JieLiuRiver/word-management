import { NextFunction, Request, Response } from 'express';
import { User } from '@/interfaces/users.interface';
import { UserService } from '@/services/users.service';

export class UserController {
  public user = new UserService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
