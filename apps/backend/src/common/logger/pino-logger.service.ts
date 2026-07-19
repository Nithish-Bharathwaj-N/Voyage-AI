import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';
import { requestIdStorage } from '../middleware/request-id.middleware';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private readonly logger: pino.Logger;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';

    // Configure standard pino instance
    this.logger = pino({
      level: isProduction ? 'info' : 'debug',
      transport: isProduction
        ? undefined
        : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          },
    });
  }

  private getContext(): { requestId?: string } {
    const requestId = requestIdStorage.getStore();
    return requestId ? { requestId } : {};
  }

  log(message: unknown, context?: string): void {
    const ctx = this.getContext();
    const cleanMsg =
      typeof message === 'object' && message !== null ? JSON.stringify(message) : String(message);
    this.logger.info({ ...ctx, context }, cleanMsg);
  }

  error(message: unknown, trace?: string, context?: string): void {
    const ctx = this.getContext();
    const cleanMsg =
      typeof message === 'object' && message !== null ? JSON.stringify(message) : String(message);
    this.logger.error({ ...ctx, context, trace }, cleanMsg);
  }

  warn(message: unknown, context?: string): void {
    const ctx = this.getContext();
    const cleanMsg =
      typeof message === 'object' && message !== null ? JSON.stringify(message) : String(message);
    this.logger.warn({ ...ctx, context }, cleanMsg);
  }

  debug(message: unknown, context?: string): void {
    const ctx = this.getContext();
    const cleanMsg =
      typeof message === 'object' && message !== null ? JSON.stringify(message) : String(message);
    this.logger.debug({ ...ctx, context }, cleanMsg);
  }

  verbose(message: unknown, context?: string): void {
    const ctx = this.getContext();
    const cleanMsg =
      typeof message === 'object' && message !== null ? JSON.stringify(message) : String(message);
    this.logger.trace({ ...ctx, context }, cleanMsg);
  }
}
