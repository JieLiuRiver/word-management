import jwt from 'jsonwebtoken';
import { JwtPayload } from '@/interfaces/auth.interface';
import { SECRET_KEY, TOKEN_LIFE } from '@/config';

class JwtService {
  sign(payload: JwtPayload, personalKey: string): string {
    return jwt.sign(payload, this.createSecretString(personalKey), { expiresIn: TOKEN_LIFE }) as string;
  }

  verify(token: string, personalKey: string): JwtPayload {
    return jwt.verify(token, this.createSecretString(personalKey)) as unknown as JwtPayload;
  }

  decodePayload(token: string): JwtPayload {
    return jwt.decode(token) as unknown as JwtPayload;
  }

  private createSecretString(personalKey: string): string {
    return `${SECRET_KEY}${personalKey}`;
  }
}

export default new JwtService();
