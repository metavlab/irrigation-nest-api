import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AccountRoleService } from '../services/account.role.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';
import { CurrentUser, ICurrentUser } from 'src/decorators';
import { UserRoleEntity } from 'src/api/admin/entities';
import { PermissionModule, RegistDynamicRoute } from 'src/common';
import { RequestIdsVo } from 'src/shared/vo/req.ids.vo';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Account Role`)
@PermissionModule('角色管理')
@RegistDynamicRoute('admin')
@Controller('account/role')
export class AccountRoleController {
  constructor(private readonly service: AccountRoleService) {}

  @ApiOperation({
    summary: 'Get my roles',
    description: 'Get Current user roles',
  })
  @ApiOkResponse({
    type: UserRoleEntity,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/current')
  public getMyRoles(
    @CurrentUser() user: ICurrentUser,
  ): Promise<UserRoleEntity[] | never> {
    return this.service.currentUserRoles(user);
  }

  @ApiOperation({
    summary: 'Create user role relations',
  })
  @ApiOkResponse({
    type: Number,
    description:
      'create data records counts,If all roleIds exist in DB will return 0',
  })
  @HttpCode(HttpStatus.OK)
  @Post(':userId')
  public createRoleForUser(
    @Param('userId') userId: number,
    @Body() { ids }: RequestIdsVo,
  ): Promise<number | never> {
    return this.service.createUserRole(userId, ids);
  }
}
