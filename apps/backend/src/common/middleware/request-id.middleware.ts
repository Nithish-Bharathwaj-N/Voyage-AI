import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

export const requestIdStorage = new AsyncLocalStorage<string>();

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const headerValue = req.headers['x-request-id'];
    const requestId = Array.isArray(headerValue)
      ? headerValue[0]
      : (headerValue as string) || randomUUID();

    // Set request attribute for express handlers
    (req as unknown as Record<string, unknown>).requestId = requestId;

    // Set response header
    res.setHeader('X-Request-ID', requestId);

    // Run within request-scoped storage context
    requestIdStorage.run(requestId, () => {
      next();
    });
  }
}
