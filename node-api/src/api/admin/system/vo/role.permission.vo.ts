import { ApiProperty } from '@nestjs/swagger';
import { IPermission } from 'src/common';

export class RolePermissionVo implements IPermission {
  @ApiProperty({
    description: 'Role ID',
    type: Number,
    required: false,
  })
  roleId?: number;
  @ApiProperty({
    description: 'User ID',
    type: Number,
    required: false,
  })
  userId?: number;

  @ApiProperty({
    description: 'Resource no',
  })
  resourceNo: string;
  @ApiProperty({
    description: 'Resource Module name',
  })
  moduleName: string;
  controllerName?: string;
  controllerRoute?: string;
  methodName: string;

  @ApiProperty({
    description: 'Resource request method',
  })
  method: string;
  @ApiProperty({
    description: 'Resource route path',
  })
  url: string;

  methodDesc?: string;
}
