import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { IUserRequest } from 'src/core/interfaces';
import { QueryOptionsDto } from 'src/core/models';

export class UserReqDto extends QueryOptionsDto implements IUserRequest {
  @ApiPropertyOptional({ required: false, description: 'user name for login' })
  @IsOptional()
  readonly username?: string;

  @ApiPropertyOptional({ required: false, description: 'mobile' })
  @ValidateIf((o) => o.mobile != '')
  @IsOptional()
  readonly mobile?: string;

  @ApiPropertyOptional({ required: false, description: 'Email address' })
  @ValidateIf((o) => o.email != '')
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({ required: false, description: 'nick name' })
  @ValidateIf((o) => o.nickname != '')
  @IsOptional()
  readonly nickname?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Platform',
    enum: [0, 2, 3],
  })
  @IsEnum(
    { Guest: 0, Management: 2, CommonUser: 3 },
    { message: 'Platform require 0-Guest,2-merchant or 3-CommonUser' },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '')
  @IsOptional()
  readonly platform?: number;
}
