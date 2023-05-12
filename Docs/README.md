# Nest API Framework

## Error Code defined

### Defined error code in src/error/error.code.ts

> like follow code

```ts
export const ErrorMessage = {
  999999: '未知错误',
  100101: '参数非法',
  400101: '用户名重复',
  400102: '手机号码重复',
  400103: '邮箱地址重复',
  ...
};

export enum ErrorCodeEnum {
  UNKNOW_ERROR = 999999,
  ILLEGAL_ARGS = 100101,
  DUPLICATE_USERNAME = 400101,
  DUPLICATE_MOBILE = 400102,
  DUPLICATE_EMAIL = 400103,
  ...
}
```

> throw Exception 

```ts
throw new HttpException(getBizError(ErrorCodeEnum.DUPLICATE_MOBILE),HttpStatus.BAD_REQUEST)
```