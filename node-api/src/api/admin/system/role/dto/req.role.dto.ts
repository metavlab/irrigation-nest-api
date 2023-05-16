import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import { QueryOptionsDto } from 'src/shared/dto/query.options.dto';

export class ReqRoleDto extends QueryOptionsDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Role name',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Role descripton',
  })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  readonly description?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Role status',
    enum: [0, 1],
  })
  @IsEnum({ Disable: 0, Enable: 1 }, { message: 'status require 0 or 1' })
  @ValidateIf((o) => o.status != '')
  @Type(() => Number)
  @IsOptional()
  readonly status?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Is Default role',
    enum: [0, 1],
  })
  @IsEnum({ NO: 0, YES: 1 }, { message: 'default require 0 or 1' })
  @ValidateIf((o) => o.isDefault != '')
  @Type(() => Number)
  @IsOptional()
  readonly isDefault?: number;
}
