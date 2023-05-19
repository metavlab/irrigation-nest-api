import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/core/common/services/tools/tools.service';
import { UserEntity } from 'src/core/entities/user.entity';
import { PageEnum, PlatformEnum, StatusEnum } from 'src/enums';
import { DataSource, Like, Repository } from 'typeorm';

import { ErrorCodeEnum, getBizError } from 'src/errors';
import {
  IModifyPassword,
  ISignup,
  IUserRequest,
  IUserService,
} from 'src/core/interfaces';
import { UserListVo, UserVo } from 'src/core/models/user.vo';
import { mapToObj } from 'src/utils';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
    private readonly toolService: ToolsService,
  ) {}

  async getCommonUser(reqUser: IUserRequest): Promise<UserListVo> {
    const {
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      username,
      mobile,
      email,
      nickname,
      wechat,
    } = reqUser;

    const map = new Map();

    map.set('platform', PlatformEnum.FARMER_PLATFORM);
    username && map.set('username', Like(`${username}%`));
    mobile && map.set('mobile', Like(`${mobile}%`));
    email && map.set('email', Like(`${email}%`));
    nickname && map.set('nickname', Like(`${nickname}%`));
    wechat && map.set('wechat', Like(`${wechat}%`));

    const [data, total] = await this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .where(mapToObj(map))
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .printSql()
      .getManyAndCount();

    return {
      pageNumber,
      pageSize,
      total,
      data,
    };
  }

  async createCommonUser(userDto: ISignup): Promise<UserVo> {
    return this.createUser({
      ...userDto,
      platform: PlatformEnum.FARMER_PLATFORM,
    });
  }

  async createUser(userDto: ISignup): Promise<UserVo> {
    const {
      username,
      mobile,
      email,
      password,
      platform = PlatformEnum.FARMER_PLATFORM,
    } = userDto;

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

    const status = [
      PlatformEnum.ADMIN_PLATFORM,
      PlatformEnum.MERCHANT_PLATFORM,
    ].includes(platform)
      ? StatusEnum.FORBIDDEN
      : StatusEnum.NORMAL;
    const user: UserEntity = await this.userRepository.save(
      await this.userRepository.create({
        ...userDto,
        nickname: userDto.nickname || userDto.username,
        password: encryptPassword,
        platform: platform,
        isSuper: 0,
        status,
      }),
    );

    return user;
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

  async updatePasswordById(
    id: number,
    dto: IModifyPassword,
  ): Promise<number | never> {
    const { password, newPassword } = dto;
    const u: UserEntity = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .addSelect(['user.password'])
      .where('user.id = :id', { id })
      .getOne();
    if (!u)
      throw new HttpException(
        getBizError(ErrorCodeEnum.USER_ACCOUNT_INVALID),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const matched = await this.toolService.validPassword(password, u.password);
    if (!matched)
      throw new HttpException(
        getBizError(ErrorCodeEnum.LOGIN_FAILED, `Old password incorrect.`),
        HttpStatus.FORBIDDEN,
      );

    const encrypt = await this.toolService.encrptPassword(newPassword);

    const { affected } = await this.userRepository.update(
      { id: id },
      { password: encrypt },
    );
    return affected;
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
