import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupUserDto } from '../user/dto/signup.user.dto';

import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserVo } from '../user/vo/user.vo';

@ApiTags('API Document - Auth')
@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserVo, description: 'User created infomartion' })
  @Post('/signup')
  async signup(@Body() userDto: SignupUserDto): Promise<UserVo> {
    const user = await this.userService.createUser(userDto);
    return user;
  }
}
