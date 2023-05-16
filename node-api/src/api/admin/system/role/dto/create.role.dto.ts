import { Transform, TransformFnParams } from 'class-transformer';
import { RoleDto } from './role.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto extends RoleDto {
  @ApiPropertyOptional({
    required: true,
    description: 'Role name',
  })
  @IsString({ message: 'Require a string' })
  @IsNotEmpty({ message: 'Role name required' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly name?: string;
}
