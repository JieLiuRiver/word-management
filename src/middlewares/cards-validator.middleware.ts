import { HttpException } from '@/exceptions/httpException';
import Joi from 'joi';
import { NextFunction, Response, Request } from 'express';

const usernameSchema = Joi.string().required().messages({
  'any.required': 'Ooops, the username is required',
});

export function validateUsername(req: Request, res: Response, next: NextFunction) {
  const { error } = usernameSchema.validate(req.body.username);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}

const wordSchema = Joi.string().required().messages({
  'any.required': 'Ooops, the word is required',
});
export function validateBodyWordFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = wordSchema.validate(req.body.word);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}

const idSchema = Joi.string().required().messages({
  'any.required': 'Ooops, the id field is required.',
});
export function validateParamsIdFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = idSchema.validate(req.params.id);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}
