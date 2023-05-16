import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleDto } from './role.dto';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateRoleDto extends RoleDto {
  @ApiPropertyOptional({
    required: true,
    description: 'Role name',
  })
  @IsString({ message: 'Require a string' })
  @ValidateIf((o) => o.name != '')
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsOptional()
  readonly name?: string;
}
