import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserListVo, UserVo } from '../vo/user.vo';
import { UserReqDto } from './dto/user.req.dto';
import { ErrorCodeEnum, getBizError } from 'src/errors/error.code';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('API Document - User')
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
}
