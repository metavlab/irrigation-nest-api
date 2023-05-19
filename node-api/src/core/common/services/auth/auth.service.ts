import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/core/common/services/tools/tools.service';
import { API_VERSION } from 'src/core/consts';
import { UserEntity } from 'src/core/entities/user.entity';
import { ISignBase, JwtAccessPayload } from 'src/core/interfaces';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { Repository } from 'typeorm';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly toolService: ToolsService,
    private readonly authHelper: AuthHelper,
  ) {}

  async userLogin(signinDto: ISignBase): Promise<string | never> {
    const { username, password } = signinDto;
    const user: UserEntity = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .addSelect(['user.password'])
      .andWhere(
        'user.username = :username OR user.mobile = :mobile OR user.email = :email',
        { username, mobile: username, email: username },
      )
      .getOne();

    if (!user)
      throw new HttpException(
        getBizError(ErrorCodeEnum.USER_NOT_FOUND),
        HttpStatus.NOT_FOUND,
      );

    if (user.status === 0) {
      throw new HttpException(
        getBizError(ErrorCodeEnum.USER_ACCOUNT_INVALID),
        HttpStatus.FORBIDDEN,
      );
    }

    const matched = await this.toolService.validPassword(
      password,
      user.password,
    );
    if (!matched)
      throw new HttpException(
        getBizError(ErrorCodeEnum.LOGIN_FAILED),
        HttpStatus.FORBIDDEN,
      );
    const payload: JwtAccessPayload = {
      id: Number(user.id),
      username: user.username,
      version: API_VERSION,
      platform: user.platform,
    };
    const accessToken: string = await this.authHelper.generateToken(payload);

    return accessToken;
  }

  public async refresh(user: JwtAccessPayload): Promise<string> {
    //TODO save user last login records
    return await this.authHelper.generateToken(user);
  }
}
