import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo } from 'src/shared/vo/query.list.vo';
import { QueryVo } from 'src/shared/vo/query.vo';

export class AccessVo extends QueryVo {
  @ApiProperty({ description: 'Module name' })
  moduleName: string;

  @ApiProperty({ description: 'action name' })
  actionName: string;

  @ApiProperty({ description: 'icon' })
  icon?: string;

  @ApiProperty({ description: 'resource url' })
  url: string;

  @ApiProperty({ description: 'Request Method type,GET,DELETE,POST ed.' })
  method?: string;

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
