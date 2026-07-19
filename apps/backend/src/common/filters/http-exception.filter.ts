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
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let errorDetails: unknown = null;

    if (exception instanceof HttpException) {
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as { message?: string }).message || exception.message;
        errorDetails = exceptionResponse;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Never log or expose credentials, tokens, or raw stacks in public responses
    const isProduction = process.env.NODE_ENV === 'production';

    // Log exception internally
    this.logger.error(
      `${request.method} ${request.url} failed with status ${status}: ${exception instanceof Error ? exception.stack : JSON.stringify(exception)}`,
    );

    response.status(status).json({
      success: false,
      message,
      error: {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        ...(isProduction ? {} : { details: errorDetails || exception.stack || exception }),
      },
    });
  }
}
