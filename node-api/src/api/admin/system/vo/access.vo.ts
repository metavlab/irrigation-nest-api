import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo, QueryVo } from 'src/core/models';

export class AccessVo extends QueryVo {
  @ApiProperty({ description: 'Access resource id' })
  resourceId?: number;
  @ApiProperty({ description: 'Module name' })
  name: string;

  @ApiProperty({ description: 'action name' })
  actionName: string;

  @ApiProperty({ description: 'icon' })
  icon?: string;

  @ApiProperty({ description: 'resource url' })
  url: string;

  @ApiProperty({ description: 'resource praent ID' })
  parentId: number;

  @ApiProperty({ description: 'resource sort number' })
  sortno: number;

  @ApiProperty({ description: 'resource description' })
  description: string;

  @ApiProperty({ description: 'resource status' })
  status?: number;
}

export class AccessListVo extends QueryListVo {
  @ApiProperty({
    description: 'Access pager list',
    type: AccessVo,
    isArray: true,
  })
  data: AccessVo[];
}
