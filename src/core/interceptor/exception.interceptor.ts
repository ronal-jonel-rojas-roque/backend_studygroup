import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    ctx.getRequest<Request>();
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      exception['response'].message ||
      exception.message ||
      'Internal server error';

    statusCode == 404 ? (statusCode = 400) : statusCode;
    if (!Array.isArray(message)) {
      message = [message];
    }

    const data = null;

    response.status(statusCode).json({
      statusCode,
      message,
      data,
    });
  }
}
