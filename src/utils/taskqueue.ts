type TaskFunction = () => Promise<void>;

export default class TaskQueue {
  private queue: { task: TaskFunction; retryCount: number }[];
  private isProcessing: boolean;
  private retryDelay: number;
  private maxRetryCount: number;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.retryDelay = 500;
    this.maxRetryCount = 2;
  }

  async addTask(task: TaskFunction, retryCount = 0) {
    this.queue.push({
      task,
      retryCount,
    });
    if (!this.isProcessing) {
      this.processNext();
    }
  }

  async processNext() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }
    this.isProcessing = true;
    const { task, retryCount } = this.queue.shift();
    try {
      await task();
      this.processNext();
    } catch (error) {
      console.log('Task failed with error:', error);
      if (retryCount < this.maxRetryCount) {
        console.log(`Task will be retried after ${this.retryDelay}ms. Retry count: ${retryCount + 1}`);
        setTimeout(() => this.addTask(task, retryCount + 1), this.retryDelay);
      } else {
        console.log('Task failed after maximum retry attempts');
      }
      this.isProcessing = false;
    }
  }
}
