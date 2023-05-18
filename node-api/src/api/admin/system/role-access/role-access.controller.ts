import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleAccessService } from './role-access.service';
import { RoleAccessEntity } from '../../entities';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';
import { PermissionModule, RegistDynamicRoute } from 'src/common';
import { ReqApproveRoleAccessDto } from './dto/req.approve.access.dto';
import { RolePermissionVo } from '../vo/role.permission.vo';
import { CurrentUser, ICurrentUser } from 'src/decorators';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Role Access Module`)
@PermissionModule('角色授权')
@RegistDynamicRoute('admin')
@Controller('role/access')
export class RoleAccessController {
  constructor(private readonly service: RoleAccessService) {}

  @ApiOperation({
    summary: '查询角色授权',
    description: '查询指定角色授权列表',
  })
  @ApiOkResponse({
    type: RolePermissionVo,
    isArray: true,
    description: '返回新授权成功的角色权限列表数据',
  })
  @Get(':roleId/permission')
  public getAccessByRoles(
    @Param('roleId') roleId: number,
    @CurrentUser() currentUser: ICurrentUser,
  ): Promise<RolePermissionVo[] | never> {
    return this.service.getAccessPermissionByRole(roleId, currentUser);
  }

  @ApiOperation({
    summary: '批量授权',
    description: '给指定角色批量授权API权限',
  })
  @ApiOkResponse({
    type: RoleAccessEntity,
    isArray: true,
    description: '返回新授权成功的角色权限列表数据',
  })
  @Post(':id/batch_approve')
  public async batchApproveByRoleId(
    @Param('id') id: number,
    @Body() data: ReqApproveRoleAccessDto,
  ): Promise<RoleAccessEntity[] | never> {
    const { accessIds } = data;
    //check role
    await this.service.validateRole(id);

    //remove db access not in accessIds
    await this.service.cleanNotInByRole(id, accessIds);

    return await this.service.batchCreateForRole(id, accessIds);
  }

  @ApiOperation({
    summary: '批量移除授权',
    description: '给指定角色批量移除API权限',
  })
  @ApiOkResponse({
    type: Number,
    description: '返回移除成功的角色权限条数',
  })
  @Post(':roleId/batch_remove')
  public batchRemoveApproveByRole(
    @Param('roleId') roleId: number,
    @Body() data: ReqApproveRoleAccessDto,
  ): Promise<number | never> {
    return this.service.batchRemoveForRole(roleId, data.accessIds);
  }
}
