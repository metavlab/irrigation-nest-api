import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SWAGGER_MOD_CORE } from 'src/core/consts';
import { UserService } from '../../common/services/user/user.service';
import { UserSignupDto } from '../dto/user.signup.dto';

import { ApiIgnoreTransform, PublicApi } from 'src/decorators';
import { UserSiginDto } from '../dto/user.signin.dto';
import { AuthService } from 'src/core/common/services/auth/auth.service';
import { JwtAccessPayload } from 'src/core/interfaces';
import { UserEntity } from 'src/core/entities/user.entity';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { UserVo } from 'src/core/models';

@ApiTags(`${SWAGGER_MOD_CORE} - Authencation`)
@Controller()
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiResponse({ type: UserVo, description: 'User created infomartion' })
  @PublicApi()
  @Post('/signup')
  async signup(@Body() userDto: UserSignupDto): Promise<UserVo> {
    const user = await this.userService.createCommonUser(userDto);
    return user;
  }

  @ApiResponse({ type: String, description: 'User access token' })
  @ApiIgnoreTransform()
  @PublicApi()
  @Post(['/signin', '/auth'])
  public async signin(@Body() signinDto: UserSiginDto): Promise<string> {
    const token: string = await this.authService.userLogin(signinDto);

    return token;
  }

  @Post('refresh')
  @ApiIgnoreTransform()
  @UseGuards(JwtAuthGuard)
  private async refresh(@Req() { user }: Request): Promise<string | never> {
    const { id, username, platform } = user as UserEntity;
    const payload: JwtAccessPayload = {
      id: Number(id),
      username,
      version: '2',
      platform,
    };
    return await this.authService.refresh(payload);
  }
}
