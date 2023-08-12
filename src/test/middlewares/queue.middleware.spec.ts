import { ApiResponse } from '@/interfaces/api.interface';
import { Request, NextFunction } from 'express';
import { queueMiddleware } from '@/middlewares/queue.middleware';
import TaskQueue from '@/utils/taskqueue';

describe('queueMiddleware', () => {
  let updateCardFunction: jest.Mock;
  let req: Partial<Request>;
  let res: Partial<ApiResponse>;
  let next: NextFunction;
  let taskQueueAddTaskSpy: jest.SpyInstance;

  beforeEach(() => {
    updateCardFunction = jest.fn();
    req = {};
    res = {};
    next = jest.fn();
    taskQueueAddTaskSpy = jest.spyOn(TaskQueue.prototype, 'addTask');
  });

  afterEach(() => {
    taskQueueAddTaskSpy.mockRestore();
  });

  it('should add the task to the task queue', async () => {
    const middleware = queueMiddleware(updateCardFunction);
    await middleware(req as Request, res as ApiResponse, next);

    expect(taskQueueAddTaskSpy).toHaveBeenCalled();
    expect(updateCardFunction).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });
});
