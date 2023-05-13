import { ApiProperty } from '@nestjs/swagger';
import { QueryVo } from './query.vo';

export class UserTokenVo extends QueryVo {
  @ApiProperty({ description: 'username' })
  username?: string;

  @ApiProperty({ description: 'mobile' })
  mobile?: string;

  @ApiProperty({ description: 'email' })
  email?: string;

  @ApiProperty({ description: 'user nickname' })
  nickname?: string;

  @ApiProperty({
    description:
      'user platform:0-guest(no auth),1-administrator,2-merchant,3-farmer',
  })
  platform?: number;

  @ApiProperty({ description: 'Is super user:0-no,1-yes' })
  isSuper?: number;

  @ApiProperty({ description: 'user token' })
  token?: string;

  @ApiProperty({ description: 'Token expiration' })
  expire?: Date;
}
