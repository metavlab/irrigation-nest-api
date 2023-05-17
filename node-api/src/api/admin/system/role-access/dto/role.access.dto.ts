import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RoleAccessDto {
  @ApiPropertyOptional({
    required: true,
    description: 'Role id key',
  })
  @IsInt({ message: 'role id require an number' })
  @IsNotEmpty({ message: 'role id required' })
  @Type(() => Number)
  roleId: number;

  @ApiPropertyOptional({
    required: true,
    description: 'Access id key',
  })
  @IsInt({ message: 'access id require an number' })
  @IsNotEmpty({ message: 'access id required' })
  @Type(() => Number)
  accessId: number;

  @ApiPropertyOptional({
    required: true,
    description: 'Resource no,it must in resource table',
  })
  @IsString()
  @IsNotEmpty({ message: 'Resource no require.' })
  resourceNo: string;
}
