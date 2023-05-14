import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsPayload } from '../types/auth.credentials.type';
import { ErrorCodeEnum, getBizError } from 'src/errors';

@Injectable()
export class AuthHelper {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  private readonly jwt: JwtService;

  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  /**
   *
   * @param payload
   * @returns string access_token
   */
  public generateToken(payload: AuthCredentialsPayload): string {
    return this.jwt.sign(payload);
  }

  public async decryptToken(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(
    decoded: AuthCredentialsPayload,
  ): Promise<UserEntity> {
    return this.repository.findOneBy({ id: decoded.id });
  }

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = await this.jwt.verify(token);
    if (!decoded) {
      throw new HttpException(
        getBizError(ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID),
        HttpStatus.FORBIDDEN,
      );
    }
    const user: UserEntity = await this.validateUser(
      decoded as AuthCredentialsPayload,
    );
    if (!user)
      throw new UnauthorizedException(
        getBizError(ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID),
      );
    return true;
  }
}
