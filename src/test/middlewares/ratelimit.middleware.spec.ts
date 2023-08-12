import { store, createRateLimitMiddleware } from '@/middlewares/ratelimit.middleware';
import { withErrorMessagePrefix } from '@/utils';
import { NextFunction } from 'express';

describe('rateLimit middleware', () => {
  let middleware;
  let mockReq;
  let mockRes;
  let next: NextFunction;

  beforeEach(() => {
    middleware = createRateLimitMiddleware();
    mockReq = {
      ip: '127.0.0.1',
    };
    mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should increment count and call next if below limit', async () => {
    middleware(mockReq, mockRes, next);
    expect(mockRes.status).not.toBeCalled();
    expect(next).toBeCalled();
  });

  it('should allow if below limit', async () => {
    await middleware(mockReq, mockRes, next);
    expect(mockRes.status).not.toBeCalled();
    expect(next).toBeCalled();
  });

  it('should block if over limit', async () => {
    store.set(mockReq.ip, 31);

    await middleware(mockReq, mockRes, next);

    expect(mockRes.status).toBeCalledWith(429);
    expect(mockRes.send).toBeCalledWith(withErrorMessagePrefix('too many requests'));
    expect(next).not.toBeCalled();
  });
});
