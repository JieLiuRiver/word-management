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
  const { error } = usernameSchema.validate(req.body.username);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}

const wordSchema = Joi.string()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('word is required'),
  });
export function validateBodyWordFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = wordSchema.validate(req.body.word);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}

const idSchema = Joi.string()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('id field is required'),
  });
export function validateParamsIdFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = idSchema.validate(req.params.id);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}
const pageSchema = Joi.object({
  pageNumber: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': withErrorMessagePrefix('pageNumber must be a number'),
      'number.integer': withErrorMessagePrefix('pageNumber must be an integer'),
      'number.min': withErrorMessagePrefix('pageNumber must be greater than 0'),
      'any.required': withErrorMessagePrefix('pageNumber is required'),
    }),
  pageSize: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': withErrorMessagePrefix('pageSize must be a number'),
      'number.integer': withErrorMessagePrefix('pageSize must be an integer'),
      'number.min': withErrorMessagePrefix('pageSize must be greater than 0'),
      'any.required': withErrorMessagePrefix('pageSize is required'),
    }),
});

export function validatePageParams(req, res, next) {
  const { error } = pageSchema.validate(req.query);

  if (error) {
    return next(new HttpException(400, error.details[0].message));
  }

  next();
}
