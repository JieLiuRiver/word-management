import { NextFunction, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { EUserType } from '@/interfaces/users.interface';

export const AdminApiGuardMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req?.user?.type !== EUserType.ADMIN) {
    next(new HttpException(409, 'No access rights'));
  }
  next();
};
