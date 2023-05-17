import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserListVo, UserVo } from '../vo/user.vo';
import { UserReqDto } from './dto/user.req.dto';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { ModifyPasswordDto } from './dto/modify.password.dto';
import { PermissionModule } from 'src/common';

@ApiTags('API Document - User')
@PermissionModule('账号管理')
@PermissionModule()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserVo, description: 'User Object' })
  @UseGuards(JwtAuthGuard)
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
    console.log(queryDto);
    throw new HttpException(
      getBizError(ErrorCodeEnum.DUPLICATE_USERNAME),
      HttpStatus.BAD_REQUEST,
    );
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
