export interface JobOptions {
  delay?: number;
  attempts?: number;
  backoff?: {
    type: 'fixed' | 'exponential';
    delay: number;
  };
  priority?: number;
}

export interface QueueClient {
  addJob<T>(queueName: string, jobName: string, payload: T, options?: JobOptions): Promise<string>;
}

// In-Memory implementation for testing.
// Production will implement BullMQClient.
export class InMemoryQueueClient implements QueueClient {
  async addJob<T>(queueName: string, jobName: string, payload: T, options?: JobOptions): Promise<string> {
    const jobId = Math.random().toString(36).substring(7);
    console.log(`[InMemoryQueue] Added job ${jobName} to queue ${queueName} (ID: ${jobId})`, payload);
    return jobId;
  }
}
