import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { SignupUserDto } from './dto/signup.user.dto';
import { UserVo } from './vo/user.vo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly dataSource: DataSource,
  ) {}

  // async createUser(userDto:SignupUserDto):Promise<UserVo> {

  // }

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
}
