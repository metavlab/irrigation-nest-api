import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../admin/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ToolsService } from 'src/shared/services/tools/tools.service';
import { UserVo } from '../vo/user.vo';
import { PlatformEnum } from 'src/enums/platform.enum';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { UserSignupDto } from '../auth/dto/user.signup.dto';
import { ModifyPasswordDto } from './dto/modify.password.dto';

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

    const user: UserEntity = await this.userRepository.save(
      await this.userRepository.create({
        ...userDto,
        nickname: userDto.nickname || userDto.username,
        password: encryptPassword,
        platform: PlatformEnum.MERCHANT_PLATFORM,
        isSuper: 0,
      }),
    );
    console.log('user', user);

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

  async updatePasswordById(
    id: number,
    dto: ModifyPasswordDto,
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
