import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum } from './error.code';

export class BizException extends HttpException {
  private errcode: ErrorCodeEnum;
  constructor(
    errorCode?: ErrorCodeEnum,
    errorMessage?: string,
    statusCode?: HttpStatus,
  ) {
    const errmsg: string =
      errorMessage ||
      errorCode?.toString() ||
      ErrorCodeEnum.UNKNOW_ERROR.toString();

    super(errmsg, statusCode || HttpStatus.OK);
    this.errcode = errorCode ?? ErrorCodeEnum.UNKNOW_ERROR;
  }

  public get ErrCode() {
    return this.errcode.valueOf();
  }
}
