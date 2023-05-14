import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ToolsService } from 'src/shared/services/tools/tools.service';
import { UserSiginDto } from './dto/user.signin.dto';
import { UserService } from '../user/user.service';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { AuthCredentialsPayload } from '../types/auth.credentials.type';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: UserService,
    private readonly toolService: ToolsService,
    private readonly authHelper: AuthHelper,
  ) {}

  async userLogin(signinDto: UserSiginDto): Promise<string | never> {
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

    if (user.isDeleted === 1 || user.status === 0) {
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
    const payload: AuthCredentialsPayload = {
      id: Number(user.id),
      username: user.username,
      version: '1',
      platform: user.platform,
    };
    const accessToken: string = await this.authHelper.generateToken(payload);

    return accessToken;
  }

  public async refresh(user: AuthCredentialsPayload): Promise<string> {
    //TODO save user last login records
    return await this.authHelper.generateToken(user);
  }
}
