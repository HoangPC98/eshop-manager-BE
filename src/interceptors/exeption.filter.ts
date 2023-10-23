import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private log = new Logger('HttpException');
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpCtx = host.switchToHttp();
    const response = httpCtx.getResponse<Response>();
    this.log.warn(exception)
    return response
      .status(exception.getStatus())
      .json({
        code: exception.getStatus(),
        timestamp: new Date().toISOString(),
        message: exception.message
      });
  }
}