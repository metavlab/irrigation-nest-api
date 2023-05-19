import { ApiProperty } from '@nestjs/swagger';
import { QueryListVo, QueryVo } from 'src/core/models';

export class UserVo extends QueryVo {
  @ApiProperty({ description: 'Username' })
  username?: string;

  @ApiProperty({ description: 'nickname' })
  nickname?: string;

  @ApiProperty({ description: 'phone number' })
  mobile?: string;

  @ApiProperty({ description: 'email address' })
  email?: string;

  @ApiProperty({ description: 'user status: 0-unavailable,1-available' })
  status?: number;

  @ApiProperty({
    description:
      'user Platform: 0-Guest(No Auth),1-adminstrator,2-merchant,3-farmer',
  })
  platform?: number;

  @ApiProperty({ description: 'Username' })
  isSuper?: number;

  @ApiProperty({ description: 'Username' })
  wechat?: string;

  @ApiProperty({ description: 'Username' })
  wechatUid?: string;
}

export class UserListVo extends QueryListVo {
  @ApiProperty({ description: 'User record list', type: UserVo, isArray: true })
  data: UserVo[];
}
