import { Response } from 'express';

export type ApiResponse<T = any> = Response & {
  apiSuccess: (data?: T | null) => void;
  apiError: (message: string, code?: number) => void;
};
