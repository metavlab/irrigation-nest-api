import { IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class UserDto {
  @IsOptional()
  readonly nickname?: string;

  @IsEmail({}, { message: 'Email address illegal' })
  @IsOptional()
  @ValidateIf((o) => o.email != '')
  readonly email?: string;

  @IsOptional()
  @IsEnum(
    { Guest: 0, Management: 2, CommonUser: 3 },
    { message: 'Platform require 0-Guest,2-Merchant or 3-CommonUser' },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '' && o.platform != 1)
  readonly platform?: number;
}
