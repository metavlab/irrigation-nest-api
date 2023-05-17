import { Body, Controller, Param, Post } from '@nestjs/common';
import { RoleAccessService } from './role-access.service';
import { RoleAccessEntity } from '../../entities';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';
import { PermissionModule, RegistDynamicRoute } from 'src/common';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Role Access Module`)
@PermissionModule('角色授权')
@RegistDynamicRoute('admin')
@Controller('role/access')
export class RoleAccessController {
  constructor(private readonly service: RoleAccessService) {}

  @ApiOperation({
    summary: '批量授权',
    description: '给指定角色批量授权API权限',
  })
  @ApiOkResponse({
    type: RoleAccessEntity,
    isArray: true,
    description: '返回授权成功后的角色权限列表数据',
  })
  @Post(':id/batch_approve')
  public batchApproveByRoleId(
    @Param('id') id: number,
    @Body() data: { accessIds: number[] },
  ): Promise<RoleAccessEntity[] | never> {
    return this.service.batchApproveForRole(id, data.accessIds);
  }
}
