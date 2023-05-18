export const ErrorMessage = {
  999999: '未知错误',
  100101: '参数非法',
  400101: '用户名重复',
  400102: '手机号码重复',
  400103: '邮箱地址重复',
  400104: '用户不存在',
  400105: '登录验证失败',
  400106: '用户账号失效',
  400107: '数据唯一属性重复导致冲突',
  400108: '数据不存在',

  403100: 'Access Token authencation failed.',
  403101: '接口权限验证失败',
  403102: '接口数据权限验证失败',
};

export enum ErrorCodeEnum {
  UNKNOW_ERROR = 999999,
  ILLEGAL_ARGS = 100101,
  DUPLICATE_USERNAME = 400101,
  DUPLICATE_MOBILE = 400102,
  DUPLICATE_EMAIL = 400103,
  USER_NOT_FOUND = 400104,
  LOGIN_FAILED = 400105,
  USER_ACCOUNT_INVALID = 400106,
  DATA_RECORD_CONFLICT = 400107,
  DATA_RECORD_UNFOUND = 400108,

  TOKEN_AUTHENCATION_INVALID = 403100,
  API_AUTH_FORBIDDEN = 403101,
  API_DATA_AUTH_FORBIDDEN = 403102,
}

/**
 *
 * @param errorCode
 * @returns object {errcode,errmsg}
 */
export function getBizError(
  errorCode: ErrorCodeEnum = ErrorCodeEnum.UNKNOW_ERROR,
  message?: string,
) {
  return {
    errcode: errorCode,
    message:
      message ||
      ErrorMessage[errorCode.valueOf()] ||
      getErrorTypeKey(errorCode),
    error: getErrorTypeKey(errorCode),
  };
}

export function getErrorTypeKey(value: ErrorCodeEnum) {
  return ErrorCodeEnum[value];
}
