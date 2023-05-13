import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { UserDto } from 'src/common/user/dto/user.dto';

export class AccountDto extends UserDto {
  @IsOptional()
  @IsEnum(
    { Guest: 0, Management: 2, Farmer: 3 },
    { message: 'Platform require 0-Guest,2-Merchant or 3-Farmer' },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '' && o.platform != 1)
  readonly platform?: number = 2;
}
