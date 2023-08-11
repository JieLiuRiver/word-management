import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import { HttpException } from '@/exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@/interfaces/auth.interface';
import UserModel from '@/models/users.model';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];
  return null;
};
const userModel = new UserModel();

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = getAuthorization(req);

    if (token) {
      const { name } = (await verify(token, SECRET_KEY)) as DataStoredInToken;
      const findUser = await userModel.findUserByName(name);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
