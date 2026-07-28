import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const correlationId = request.headers['x-correlation-id'];
    const { method, url } = request;
    const startTime = Date.now();

    this.logger.log(`[${correlationId}] Incoming Request - ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        const latency = Date.now() - startTime;
        this.logger.log(
          `[${correlationId}] Outgoing Response - ${method} ${url} ${response.statusCode} - ${latency}ms`,
        );
      }),
    );
  }
}
