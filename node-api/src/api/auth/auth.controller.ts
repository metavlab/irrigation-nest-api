import {
  Controller,
  Post,
  Body,
  // Response,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { UserVo } from '../vo/user.vo';
import { UserSignupDto } from './dto/user.signup.dto';
import { UserSiginDto } from './dto/user.signin.dto';
import { AuthService } from './auth.service';
import { ApiIgnoreTransform } from 'src/decorators';
// import { HEADER_JWT_TOKEN_KEY } from 'src/constants/http.constants';
import { Request } from 'express';
import { AuthCredentialsPayload } from '../types/auth.credentials.type';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';

@ApiTags('API Document - Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({ type: UserVo, description: 'User created infomartion' })
  @Post('/signup')
  async signup(@Body() userDto: UserSignupDto): Promise<UserVo> {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  @ApiResponse({ type: String, description: 'User access token' })
  @ApiIgnoreTransform()
  @Post('/signin')
  public async signin(@Body() signinDto: UserSiginDto): Promise<string> {
    const token: string = await this.authService.userLogin(signinDto);

    return token;
  }

  @Post('refresh')
  @ApiIgnoreTransform()
  @UseGuards(JwtAuthGuard)
  private async refresh(@Req() { user }: Request): Promise<string | never> {
    console.log('>>>>>>>', user);
    const { id, username, platform } = user as UserEntity;
    const payload: AuthCredentialsPayload = {
      id: Number(id),
      username,
      version: '2',
      platform,
    };
    return await this.authService.refresh(payload);
  }
}
