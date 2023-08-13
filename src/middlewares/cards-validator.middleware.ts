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

const idBodySchema = Joi.number()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('userid is required'),
  });

export function validateUserid(req: Request, res: Response, next: NextFunction) {
  const { error } = idBodySchema.validate(req.body.userid);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }
  next();
}

const userInputSchema = Joi.string()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('user_input is required'),
  });
export function validateBodyWordFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = userInputSchema.validate(req.body.user_input);

  if (error) {
    return next(new HttpException(404, error.details[0].message));
  }

  next();
}

const idParamSchema = Joi.string()
  .required()
  .messages({
    'any.required': withErrorMessagePrefix('id field is required'),
  });
export function validateParamsIdFeild(req: Request, res: Response, next: NextFunction) {
  const { error } = idParamSchema.validate(req.params.id);

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
