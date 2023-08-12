import { HttpException } from '@/exceptions/httpException';
import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';
import { withErrorMessagePrefix } from '@/utils';

const usernameSchema = Joi.string()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('username is required'),
  });

export function validateUsername(req: Request, res: Response, next: NextFunction) {
  console.log('-------- aaa', req.body);
  const { error } = usernameSchema.validate(req.body.username);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}
