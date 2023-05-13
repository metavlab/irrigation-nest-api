import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { formatDate } from 'src/utils/date.util';

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respose = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exRet: Record<string, any> =
      typeof exception?.getResponse() === 'string'
        ? { message: exception.getResponse() }
        : { ...(exception.getResponse() as Record<string, any>) };

    const errResponse = {
      code: status,
      ...exRet,
      timestamp: formatDate(new Date()),
    };
    Logger.error(
      `[${Date.now()}] ${request.method} ${request.url}`,
      JSON.stringify(errResponse),
      'HttpExceptionFilter',
    );

    //set
    respose.status(status);
    respose.header('Content-type', 'application/json; charset=utf-8');
    respose.send(errResponse);
  }
}
