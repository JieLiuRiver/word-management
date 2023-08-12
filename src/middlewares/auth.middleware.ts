import { NextFunction, Response } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import UserModel from '@/models/users.model';
import jwtService from '@/services/jwt.service';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];
  return null;
};
const userModel = new UserModel();

// The middleware is verifing token, if validated, the user object is added to the req object
export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const token = getAuthorization(req);

    if (token) {
      const payload = jwtService.decodePayload(token);
      const currentUser = await userModel.findUserByName(payload.name);
      jwtService.verify(token, currentUser.personalKey);

      if (currentUser) {
        req.user = currentUser;
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
