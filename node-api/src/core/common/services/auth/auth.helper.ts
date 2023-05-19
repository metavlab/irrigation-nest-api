import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { ErrorCodeEnum, getBizError } from 'src/errors';
import { ICurrentUser, JwtAccessPayload } from 'src/core/interfaces';
import { UserEntity } from 'src/core/entities/user.entity';
import { StatusEnum } from 'src/enums';

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
  public generateToken(payload: JwtAccessPayload): string {
    return this.jwt.sign(payload);
  }

  public async decryptToken(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: JwtAccessPayload): Promise<ICurrentUser> {
    const current: ICurrentUser = await this.repository.findOne({
      where: { id: decoded.id },
      select: [
        'id',
        'username',
        'mobile',
        'email',
        'nickname',
        'wechat',
        'wechatUid',
        'avatar',
        'platform',
        'isSuper',
        'status',
      ],
    });

    if (current && current.status === StatusEnum.FORBIDDEN) {
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.USER_ACCOUNT_INVALID,
          `User ${current.username} Inactivated.`,
        ),
        HttpStatus.FORBIDDEN,
      );
    }

    return current;
  }

  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = await this.jwt.verify(token);
    if (!decoded) {
      throw new HttpException(
        getBizError(ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID),
        HttpStatus.FORBIDDEN,
      );
    }
    const user: ICurrentUser = await this.validateUser(
      decoded as JwtAccessPayload,
    );
    if (!user)
      throw new UnauthorizedException(
        getBizError(ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID),
      );
    return true;
  }
}
