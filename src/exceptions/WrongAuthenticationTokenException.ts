import { withErrorMessagePrefix } from '@/utils/index';
import { HttpException } from './httpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, withErrorMessagePrefix('Wrong authentication token'));
  }
}

export default WrongAuthenticationTokenException;
