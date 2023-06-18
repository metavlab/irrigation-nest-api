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
import { BizException } from 'src/errors/biz.exception';

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

    const status = getStatusCode(exception);

    if (exception instanceof BizException) {
      const data: CommonResponseType = (exception as BizException).response;
      Logger.log(`BizException>>>>`, status, data);
      respose.status(200);
      respose.header('Content-type', 'application/json; charset=utf-8');
      respose.send(data);
    } else if (exception instanceof BadRequestException) {
      const errResponse = (exception as BadRequestException).getResponse();
      const message = (exception as BadRequestException).message;
      const status = (exception as BadRequestException).getStatus();

      const data: CommonResponseType = {
        code: status,
        message,
        error:
          typeof errResponse === 'object'
            ? errResponse['message']
            : errResponse,
      };
      Logger.log(`BadRequestException>>>>`, status, data);
      respose.status(200);
      respose.header('Content-type', 'application/json; charset=utf-8');
      respose.send(data);
    } else {
      respose.status(status);
      respose.header('Content-type', 'application/json; charset=utf-8');
      respose.send({
        code: status,
        message: (exception as Error).message,
      });
    }
  }
}
