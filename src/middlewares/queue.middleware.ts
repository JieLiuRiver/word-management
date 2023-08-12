import { ApiResponse } from '@/interfaces/api.interface';
import TaskQueue from '@/utils/taskqueue';
import { Request, NextFunction } from 'express';

const taskQueue = new TaskQueue();

export const queueMiddleware = updateCardFunction => {
  return async (req: Request, res: ApiResponse, next: NextFunction): Promise<void> => {
    const task = async () => {
      await updateCardFunction(req, res, next);
    };
    taskQueue.addTask(task);
  };
};
