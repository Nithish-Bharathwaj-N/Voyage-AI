import pino from 'pino';

export interface Logger {
  info(message: string, context?: Record<string, any>): void;
  error(message: string, context?: Record<string, any>): void;
  warn(message: string, context?: Record<string, any>): void;
  debug(message: string, context?: Record<string, any>): void;
  child(bindings: Record<string, any>): Logger;
}

export class PinoLogger implements Logger {
  private readonly pinoLogger: pino.Logger;

  constructor(bindings?: Record<string, any>) {
    this.pinoLogger = pino({
      level: process.env.LOG_LEVEL || 'info',
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    });

    if (bindings) {
      this.pinoLogger = this.pinoLogger.child(bindings);
    }
  }

  info(message: string, context?: Record<string, any>): void {
    this.pinoLogger.info(context || {}, message);
  }

  error(message: string, context?: Record<string, any>): void {
    this.pinoLogger.error(context || {}, message);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.pinoLogger.warn(context || {}, message);
  }

  debug(message: string, context?: Record<string, any>): void {
    this.pinoLogger.debug(context || {}, message);
  }

  child(bindings: Record<string, any>): Logger {
    return new PinoLogger(bindings);
  }
}
