import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserVo } from './vo/user.vo';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async createUser(userDto: SignupUserDto): Promise<UserVo> {
    const { username, mobile, email, password, repeat } = userDto;

    if (mobile) {
      const findMobile: UserVo | null = await this.findUserByMobile(mobile);
      if (findMobile)
        throw new HttpException(
          getBizError(ErrorCodeEnum.DUPLICATE_MOBILE),
          HttpStatus.BAD_REQUEST,
        );
    }
    if (email) {
      const findEmail = await this.findUserByEmail(email);
      if (findEmail)
        throw new HttpException(
          getBizError(ErrorCodeEnum.DUPLICATE_EMAIL),
          HttpStatus.BAD_REQUEST,
        );
    }
    const find = await this.findUserByUsername(username);
    if (find)
      throw new HttpException(
        getBizError(ErrorCodeEnum.DUPLICATE_USERNAME),
        HttpStatus.BAD_REQUEST,
      );

    return await this.findUserByUsername(username);
  }

  async userById(id: number): Promise<UserVo | null> {
    const ret = await this.userRepository.findOneBy({ id });
    // if (!ret)
    //   throw new HttpException(
    //     `User id ${id} not found.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
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
