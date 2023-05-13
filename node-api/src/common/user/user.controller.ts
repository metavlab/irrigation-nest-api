import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { UserListVo, UserVo } from './vo/user.vo';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserReqDto } from './dto/user.req.dto';
import { UserService } from './user.service';

@ApiTags('API Document - User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ type: UserVo, description: 'User Object' })
  @Get('/:id')
  getUserById(@Param('id') id: number): Promise<UserVo | null> {
    return this.userService.userById(id);
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
}
