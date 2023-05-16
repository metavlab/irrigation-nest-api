import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo } from 'src/shared/vo/query.list.vo';
import { QueryVo } from 'src/shared/vo/query.vo';

export class RoleVo extends QueryVo {
  @ApiProperty({ description: 'Role name' })
  name?: string;

  @ApiProperty({ description: 'Role description' })
  description?: string;

  @ApiProperty({ description: 'Is Default role,0:NO,1:YES' })
  isDefault?: number;
}

export class RoleListVo extends QueryListVo {
  @ApiProperty({ description: 'Role list', type: RoleVo, isArray: true })
  data: RoleVo[];
}
