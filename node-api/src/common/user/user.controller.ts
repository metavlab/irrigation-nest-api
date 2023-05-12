import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserListVo } from './vo/user.vo';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';

@Controller('user')
export class UserController {
  @Get()
  getUsers(): Promise<UserListVo> {
    throw new HttpException(
      getBizError(ErrorCodeEnum.DUPLICATE_USERNAME),
      HttpStatus.BAD_REQUEST,
    );
  }
}
