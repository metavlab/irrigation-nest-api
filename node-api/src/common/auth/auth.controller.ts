import { Body, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserSignupDto } from '../../api/auth/dto/user.signup.dto';

import { ApiResponse } from '@nestjs/swagger';
import { UserVo } from '../../api/vo/user.vo';

export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserVo, description: 'User created infomartion' })
  @Post('/signup')
  async signup(@Body() userDto: UserSignupDto): Promise<UserVo> {
    const user = await this.userService.createUser(userDto);
    return user;
  }
}
