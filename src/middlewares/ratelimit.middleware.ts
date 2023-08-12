import { withErrorMessagePrefix } from '@/utils';
import { Request, Response, NextFunction } from 'express';

export class MemoryStore {
  store: Record<string, number> = {};
  constructor() {
    this.store = {};
  }

  get(key: string) {
    return this.store[key];
  }

  set(key: string, value: number) {
    this.store[key] = value;
  }

  delete(key: string) {
    delete this.store[key];
  }
}

export const store = new MemoryStore();

type Options = {
  // the maximum number of requests allowed per unit time window
  max: number;
  // duration of the current limiting window, in milliseconds
  windowMs: number;
};

const DEFAULT_OPTIONS: Options = {
  max: 30,
  windowMs: 60 * 1000,
};

export function createRateLimitMiddleware(options?: Options) {
  const config = Object.assign(DEFAULT_OPTIONS, options);
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip;

    let count = store.get(key);
    if (!count) {
      count = 0;
    }

    count++;
    store.set(key, count);

    if (count > config.max) {
      res.status(429).send(withErrorMessagePrefix('too many requests'));
      return;
    }
    store.delete(key);

    next();
  };
}
