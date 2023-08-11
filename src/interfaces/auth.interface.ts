import { Request } from 'express';
import { User } from '@/interfaces/users.interface';

export interface DataStoredInToken {
  name: string;
}

export interface TokenData {
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
