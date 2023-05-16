import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { AccessDto } from './access.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccessDto extends AccessDto {
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
  @IsNotEmpty({ message: 'Access resource type require an number.' })
  readonly type: number;
}
