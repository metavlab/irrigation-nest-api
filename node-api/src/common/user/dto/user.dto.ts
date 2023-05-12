import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsOptional()
  readonly nickname?: string;

  @IsMobilePhone('zh-CN', {}, { message: 'Phone number incorrect' })
  @ValidateIf((o) => o.mobile != '')
  @IsOptional()
  readonly mobile?: string;

  @IsEmail({}, { message: 'Email address illegal' })
  @IsOptional()
  @ValidateIf((o) => o.email != '')
  readonly email?: string;

  @IsOptional()
  @IsEnum(
    { Guest: 0, Management: 2, Farmer: 3 },
    { message: 'Platform require 0-Guest,2-Mangement or 3-Farmer' },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '' && o.platform != 1)
  readonly platform?: number;
}
