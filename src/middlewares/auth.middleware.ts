import { NextFunction, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import UserModel from '@/models/users.model';
import jwtService from '@/services/jwt.service';
import AuthenticationTokenMissingException from '@/exceptions/authenticationTokenMissingException';
import WrongAuthenticationTokenException from '@/exceptions/wrongAuthenticationTokenException';

const getAuthorization = req => {
  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];
  return null;
};
const userModel = new UserModel();

// The middleware is verifing token, if validated, the user object is added to the req object
export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
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
        next(new WrongAuthenticationTokenException());
      }
    } else {
      next(new AuthenticationTokenMissingException());
    }
  } catch (error) {
    next(new WrongAuthenticationTokenException());
  }
};
