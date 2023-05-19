import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionModule, RegistDynamicRoute } from 'src/core/common';
import { SWAGGER_MOD_ADMIN } from 'src/core/consts';
import { SignupMajorUserDto } from './dto/create.merchat.user.dto';
import { UserService } from 'src/core/common/services/user/user.service';
import { UserVo } from 'src/core/models';
import { ISignup } from 'src/core/interfaces';
import { PlatformEnum, StatusEnum } from 'src/enums';
import { PublicApi } from 'src/decorators';

@ApiTags(`${SWAGGER_MOD_ADMIN} - User Regist`)
@PermissionModule('管理员注册')
@RegistDynamicRoute('admin')
@Controller('regist')
export class RegistController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Regist major user',
    description: 'Major user phone number required',
  })
  @ApiOkResponse({
    type: UserVo,
    description: 'regist success user infomation',
  })
  @Post('major_user')
  @PublicApi()
  public signupMajorUser(
    @Body() user: SignupMajorUserDto,
  ): Promise<UserVo | never> {
    const u: ISignup = {
      ...user,
      platform: PlatformEnum.MERCHANT_PLATFORM,
      status: StatusEnum.FORBIDDEN,
    };

    return this.userService.createUser(u);
  }
}
