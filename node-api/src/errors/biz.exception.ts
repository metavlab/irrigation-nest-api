import { ErrorCodeEnum, ErrorMessage } from './error.code';

export class BizException extends Error {
  private readonly _code: ErrorCodeEnum | number;
  private readonly _msg: string;
  private readonly _error: string | string[] | undefined;

  constructor(
    code: ErrorCodeEnum | number,
    message?: string | undefined,
    error?: string | string[] | undefined,
  ) {
    super();
    this._code = code;
    this._msg = message;
    this._error = error;
  }

  get code(): ErrorCodeEnum | number {
    return this._code;
  }

  get message(): string {
    return this._msg || super.message;
  }

  get error(): string | string[] | undefined {
    return this._error;
  }

  get response(): CommonResponseType {
    return {
      code: this._code,
      message: this.message,
      error: this._error,
    };
  }

  /**
   *
   * @param code
   * @param errMsg
   * @param errors
   * @returns
   */
  static create(
    code: ErrorCodeEnum | number,
    errMsg?: string | undefined,
    errors?: string | string[] | undefined,
  ) {
    const _msg = errMsg || ErrorMessage[code.valueOf()] || code;
    return new BizException(code, _msg, errors);
  }
}
