import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { DataSource } from 'typeorm';

@Injectable()
export class LoginService {
  private logger: Logger = new Logger(LoginService.name);

  constructor(private readonly dataSource: DataSource) {}

  async adminLogin(): Promise<any> {
    throw new HttpException(
      getBizError(ErrorCodeEnum.LOGIN_FAILED),
      HttpStatus.FORBIDDEN,
    );
  }
}
