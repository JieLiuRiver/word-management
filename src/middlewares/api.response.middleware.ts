import { NextFunction } from 'express';
import type { ApiResponse } from '@/interfaces/api.interface';

export function apiResponseMiddleware<T>(req: any, res: ApiResponse<T>, next: NextFunction) {
  res.apiSuccess = (data: T | null = null) => {
    res.status(200).json({ data, code: 0 });
  };

  res.apiError = (message: string, code = -1) => {
    res.status(200).json({ data: null, code, message });
  };

  next();
}

export default apiResponseMiddleware;
