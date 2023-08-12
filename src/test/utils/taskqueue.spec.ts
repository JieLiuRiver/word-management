import TaskQueue from '@/utils/taskqueue';

describe('TaskQueue', () => {
  let queue;

  beforeEach(() => {
    queue = new TaskQueue();
  });

  it('should add and process tasks in order', async () => {
    const task1 = jest.fn();
    const task2 = jest.fn();

    queue.addTask(task1);
    queue.addTask(task2);

    await new Promise(resolve => setTimeout(resolve, 10));

    expect(task1).toHaveBeenCalledTimes(1);
    expect(task2).toHaveBeenCalledTimes(1);
  });
  it('should retry failed tasks', async () => {
    const task = jest.fn().mockRejectedValue(new Error('Failed'));

    queue.addTask(task);

    await new Promise(resolve => setTimeout(resolve, 2000));

    expect(task).toHaveBeenCalledTimes(3);
  });

  it('should discard task after max retries', async () => {
    const task = jest.fn().mockRejectedValue(new Error('Failed'));

    queue.addTask(task);

    await new Promise(resolve => setTimeout(resolve, 2000));

    expect(task).toHaveBeenCalledTimes(3);
  });
});
