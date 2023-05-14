import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { HttpExceptionResponse } from 'src/errors';
import { formatDate } from 'src/utils/date.util';

export const getStatusCode = <T>(exception: T): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = <T>(exception: T): any => {
  if (exception instanceof HttpException) {
    const errResponse = exception.getResponse();
    const message =
      (errResponse as HttpExceptionResponse).message || exception.message;
    return message;
  } else {
    return String(exception);
  }
};

export const getErrorObject = <T>(exception: T): Record<string, any> => {
  if (exception instanceof HttpException) {
    const errResponse = exception.getResponse();
    const message =
      (errResponse as HttpExceptionResponse).message || exception.message;
    const errcode = (errResponse as HttpExceptionResponse).errcode;
    const error =
      (errResponse as HttpExceptionResponse).error ||
      (typeof message === 'string' ? message : undefined);
    return { errcode, message, error };
  } else if (exception instanceof BadRequestException) {
    const errResponse = (exception as BadRequestException).getResponse();
    return typeof errResponse === 'object'
      ? {
          ...errResponse,
        }
      : {
          message: errResponse,
        };
  } else {
    return {
      message: String(exception),
      error: String(exception),
    };
  }
};

@Catch(HttpException, ValidationError)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const respose = ctx.getResponse();
    const request = ctx.getRequest();

    const status = getStatusCode(exception);

    const exRet: Record<string, any> = getErrorObject(exception);

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
