import { NextFunction, Request } from 'express';
import { HttpException } from '@/exceptions/httpException';
import { ApiResponse } from '@/interfaces/api.interface';

export const ErrorMiddleware = (error: HttpException, req: Request, res: ApiResponse, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.apiError(message);
  } catch (error) {
    next(error);
  }
};
