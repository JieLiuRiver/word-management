import { Request } from 'express';
import { User } from '@/interfaces/users.interface';

export interface JwtPayload {
  id: number;
  name: string;
}

export interface TokenData {
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
