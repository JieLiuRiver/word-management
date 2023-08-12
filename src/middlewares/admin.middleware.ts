import { NextFunction, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { EUserType } from '@/interfaces/users.interface';
import { WITHOUT_ADMIN_PERMISSION_MESSAGE } from '@/constants';

// protect those apis which only suport excuate by admin
export const AdminApiGuardMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req?.user?.type !== EUserType.ADMIN) {
    next(new HttpException(409, WITHOUT_ADMIN_PERMISSION_MESSAGE));
  }
  next();
};
