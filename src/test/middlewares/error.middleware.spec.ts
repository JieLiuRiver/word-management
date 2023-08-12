import { NextFunction, Request } from 'express';
import { ErrorMiddleware } from '@/middlewares/error.middleware';
import { HttpException } from '@/exceptions/httpException';
import { ApiResponse } from '@/interfaces/api.interface';

describe('ErrorMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<ApiResponse>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test',
    };
    res = {
      apiError: jest.fn(),
    };
    next = jest.fn();
    console.error = jest.fn();
  });

  it('should handle HttpException and send the error response', () => {
    const error: HttpException = {
      name: 'test',
      status: 404,
      message: 'Not found',
    };

    ErrorMiddleware(error, req as Request, res as ApiResponse, next);
    expect(console.error).toHaveBeenCalledWith('[GET] /test >> StatusCode:: 404, Message:: Not found');
    expect(res.apiError).toHaveBeenCalledWith('Not found');
    expect(next).not.toHaveBeenCalled();
  });
});
