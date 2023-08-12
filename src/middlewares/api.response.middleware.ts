import { NextFunction } from 'express';
import type { ApiResponse } from '@/interfaces/api.interface';
import { ERROR_RESPONSE_CODE, SUCCESS_RESPONSE_CODE } from '@/constants';

export function apiResponseMiddleware<T>(req: any, res: ApiResponse<T>, next: NextFunction) {
  res.apiSuccess = (data: T | null = null) => {
    res.status(200).json({ data, code: SUCCESS_RESPONSE_CODE });
  };

  res.apiError = (message: string, statuCode = 200, code = ERROR_RESPONSE_CODE) => {
    res.status(statuCode).json({ data: null, code, message });
  };

  next();
}

export default apiResponseMiddleware;
