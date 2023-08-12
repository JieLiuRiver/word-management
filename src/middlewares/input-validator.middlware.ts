import { ApiResponse } from '@/interfaces/api.interface';
import { withErrorMessagePrefix } from '@/utils';
import Joi from 'joi';

const sqlBlacklist = ['SELECT', 'DROP', 'DELETE'];
const sqlRegex = new RegExp(sqlBlacklist.join('|'), 'gi');
const specialCharRegex = /[`!@#$^&*+=\[\]\\';,/{}|":<>?~_-]/;

const schema = Joi.string()
  .trim()
  .replace(sqlRegex, '')
  .replace(specialCharRegex, '')
  .regex(/^[\u4e00-\u9fa5a-zA-Z0-9\s]+$/)
  .message(withErrorMessagePrefix('input contains invalid characters'));

export default function createInputValidationMiddleware(field: string) {
  return function inputValidationMiddleware(req, res: ApiResponse, next) {
    const { error } = schema.validate(req.body[field]);
    if (error) {
      return res.apiError(error.details[0].message, 400);
    }
    next();
  };
}
