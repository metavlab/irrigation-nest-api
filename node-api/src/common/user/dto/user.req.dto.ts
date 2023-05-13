import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { QueryOptionsDto } from 'src/shared/dto/query.options.dto';

export class UserReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: 'user name for login' })
  @IsOptional()
  readonly username?: string;

  @ApiPropertyOptional({ required: false, description: 'mobile' })
  @IsMobilePhone('zh-CN', {}, { message: 'mobile incorrect format' })
  @ValidateIf((o) => o.mobile != '')
  @IsOptional()
  readonly mobile?: string;

  @ApiPropertyOptional({ required: false, description: 'Email address' })
  @IsEmail({}, { message: 'Eamil address incorrect format' })
  @ValidateIf((o) => o.email != '')
  @IsOptional()
  readonly email?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Platform',
    enum: [0, 2, 3],
  })
  @IsEnum(
    { Guest: 0, Management: 2, Farmer: 3 },
    { message: 'Platform require 0-Guest,2-merchant or 3-Farmer' },
  )
  @Type(() => Number)
  @ValidateIf((o) => o.platform != '')
  @IsOptional()
  readonly platform?: string;
}
