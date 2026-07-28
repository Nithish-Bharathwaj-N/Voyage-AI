import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal server error' };

    const errorDetails = typeof exceptionResponse === 'string'
      ? { message: exceptionResponse }
      : (exceptionResponse as Record<string, unknown>);

    const problemDetails = {
      type: 'about:blank',
      title: HttpStatus[status] || 'Error',
      status,
      detail: errorDetails.message || errorDetails.error || 'An unexpected error occurred',
      instance: request.url,
      timestamp: new Date().toISOString(),
      correlationId: request.headers['x-correlation-id'] || 'N/A', // Assuming correlation ID middleware is present
    };

    this.logger.error(
      `[${request.method}] ${request.url} - Status: ${status} - Error: ${JSON.stringify(problemDetails)}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(problemDetails);
  }
}
