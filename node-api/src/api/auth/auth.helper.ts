import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../admin/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsPayload } from '../types/auth.credentials.type';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { ICurrentUser } from 'src/decorators/current-user/current-user.decorator';

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
  ): Promise<ICurrentUser> {
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
      decoded as AuthCredentialsPayload,
    );
    if (!user)
      throw new UnauthorizedException(
        getBizError(ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID),
      );
    return true;
  }
}
