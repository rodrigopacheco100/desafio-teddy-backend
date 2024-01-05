import {
  Catch,
  type ExceptionFilter,
  type ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ZodError } from 'zod';

import { AppError } from '@/core/app-error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(`Caught exception: ${exception.stack}`);

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        ...(exception.getResponse() as object),
      });
    }

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        message: exception.message,
      });
    }

    if (exception instanceof ZodError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.format(),
      });
    }

    if (exception instanceof Error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
      });
    }

    response.status(500).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  }
}
