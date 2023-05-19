import {
  Controller,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { PermissionModule } from 'src/core/common';
import { CurrentUser } from 'src/decorators';
import { UserListVo, UserVo } from 'src/core/models';
import { UserReqDto } from 'src/core/auth/dto/user.req.dto';
import { ModifyPasswordDto } from 'src/core/auth/dto/modify.password.dto';
import { UserService } from 'src/core/common/services/user/user.service';

@ApiTags('API Document - User')
@PermissionModule('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserVo, description: 'User Object' })
  @Get('/:id')
  async getUserById(@Param('id') id: number): Promise<UserVo | null> {
    return await this.userService.userById(id);
  }

  @ApiResponse({
    type: UserListVo,
    description: 'Query user infomation by pages',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  getUsers(@Query() queryDto: UserReqDto): Promise<UserListVo> {
    const result = this.userService.getCommonUser(queryDto);
    return result;
  }

  @ApiOperation({
    summary: 'Modify My password',
    description: 'Modify Current user password',
  })
  @ApiOkResponse({
    type: Number,
    description: 'Update affected record count,success will return 1',
  })
  @HttpCode(HttpStatus.OK)
  @Post('modify_password')
  modifyMyPassword(
    @CurrentUser('id') id: number,
    @Body() dto: ModifyPasswordDto,
  ): Promise<number | never> {
    return this.userService.updatePasswordById(id, dto);
  }
}
