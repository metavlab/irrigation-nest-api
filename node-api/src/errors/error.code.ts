export const ErrorMessage = {
  999999: '未知错误',
  100101: '参数非法',
  400101: '用户名重复',
  400102: '手机号码重复',
  400103: '邮箱地址重复',
  400104: '用户不存在',
  400105: '登录失败',
};

export enum ErrorCodeEnum {
  UNKNOW_ERROR = 999999,
  ILLEGAL_ARGS = 100101,
  DUPLICATE_USERNAME = 400101,
  DUPLICATE_MOBILE = 400102,
  DUPLICATE_EMAIL = 400103,
  USER_NOTFOUND = 400104,
  LOGIN_FAILED = 400105,
}

/**
 *
 * @param errorCode
 * @returns object {errcode,errmsg}
 */
export function getBizError(
  errorCode: ErrorCodeEnum = ErrorCodeEnum.UNKNOW_ERROR,
) {
  return {
    errcode: errorCode,
    message: ErrorMessage[errorCode.valueOf()] || ErrorMessage[999999],
    error: getErrorTypeKey(errorCode),
  };
}

export function getErrorTypeKey(value: ErrorCodeEnum) {
  return ErrorCodeEnum[value];
}
