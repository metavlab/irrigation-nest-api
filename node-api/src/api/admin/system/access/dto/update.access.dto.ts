import { ApiPropertyOptional } from '@nestjs/swagger';
import { AccessDto } from './access.dto';
import { IsEnum, IsInt, IsOptional, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAccessDto extends AccessDto {
  @ApiPropertyOptional({
    required: true,
    description: 'Access Reource type,1:MODULE,2:MENU,3:API ',
    enum: [1, 2, 3],
  })
  @IsEnum(
    { MODULE: 1, MENU: 2, ACTION: 3 },
    { message: 'Access Resource type must one of 1,2,3' },
  )
  @IsInt({ message: 'Access resource type require an number.' })
  @ValidateIf((o) => o.type != '')
  @Type(() => Number)
  @IsOptional()
  readonly type: number;
}
