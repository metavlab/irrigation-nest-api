import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../api/admin/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from '../../api/user/dto/user.dto';
import { UserSignupDto } from '../../api/auth/dto/user.signup.dto';
import { UserVo } from '../../api/vo/user.vo';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { ToolsService } from 'src/shared/services/tools/tools.service';
import { PlatformEnum } from 'src/enums/platform.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly toolService: ToolsService,
  ) {}

  async createUser(userDto: UserSignupDto): Promise<UserVo> {
    const { username, mobile, email, password } = userDto;

    const queryConditions = [];
    if (username) {
      queryConditions.push('user.username = :username');
    }
    if (mobile) {
      queryConditions.push('user.mobile = :mobile');
    }
    if (email) {
      queryConditions.push('user.email = :email');
    }
    const findUser: Pick<UserEntity, 'username' | 'mobile' | 'email'> | null =
      await this.dataSource
        .createQueryBuilder(UserEntity, 'user')
        .select(['user.username', 'user.mobile', 'user.email'])
        .andWhere(queryConditions.join(' OR '), { username, mobile, email })
        .getOne();

    if (findUser) {
      if (findUser.username === username) {
        throw new HttpException(
          getBizError(ErrorCodeEnum.DUPLICATE_USERNAME),
          HttpStatus.BAD_REQUEST,
        );
      }
      if (findUser.email === email) {
        throw new HttpException(
          getBizError(ErrorCodeEnum.DUPLICATE_EMAIL),
          HttpStatus.BAD_REQUEST,
        );
      }
      if (findUser.mobile === mobile) {
        throw new HttpException(
          getBizError(ErrorCodeEnum.DUPLICATE_MOBILE),
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const encryptPassword = await this.toolService.encrptPassword(password);

    const _user: UserEntity = await this.userRepository.save(
      await this.userRepository.create({
        ...userDto,
        nickname: userDto.nickname || userDto.username,
        password: encryptPassword,
        platform: PlatformEnum.MERCHANT_PLATFORM,
        isSuper: 0,
      }),
    );

    return await this.findUserByUsername(username);
  }

  async userById(id: number): Promise<UserVo | null> {
    const ret = await this.userRepository.findOneBy({ id });
    if (!ret)
      throw new HttpException(
        `User id ${id} not found.`,
        HttpStatus.BAD_REQUEST,
      );
    return ret;
  }

  checkUserExist(user: UserDto): Promise<boolean> {
    Logger.log('User', user);
    return Promise.resolve(true);
  }

  async findUserByUsername(username: string): Promise<UserVo | null> {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserByMobile(mobile: string): Promise<UserVo | null> {
    return await this.userRepository.findOneBy({ mobile });
  }

  async findUserByEmail(email: string): Promise<UserVo | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
