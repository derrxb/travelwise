import { logWarning } from '~/infrastructure/logging/index.server';

/**
 * Arbitrary long tasks logging.
 */
export const LONG_TASKS_THRESHOLD = 2500;

/**
 * Log long tasks
 * @param startTime - The time the task started
 * @param endTime - The time the task ended
 * @param threshold - The threshold in milliseconds
 * @param name - The name of the task.
 */
export function logLongTasks(startTime: number, endTime: number, threshold: number, name: string) {
  const duration = endTime - startTime;

  if (duration > threshold) {
    logWarning(`${name} Action took longer than expected => ${duration}ms`);
  }
}
