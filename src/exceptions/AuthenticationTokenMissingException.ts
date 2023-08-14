import { withErrorMessagePrefix } from '@/utils';
import { HttpException } from './httpException';

class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(401, withErrorMessagePrefix('Authentication token missing'));
  }
}

export default AuthenticationTokenMissingException;
