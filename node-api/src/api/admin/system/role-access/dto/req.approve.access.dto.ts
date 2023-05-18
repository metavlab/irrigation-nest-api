import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class ReqApproveRoleAccessDto {
  @ApiProperty({
    type: Number,
    isArray: true,
    description: 'Access id',
  })
  @IsArray({ message: 'Require an number array' })
  @IsNumber({}, { each: true })
  @ArrayNotEmpty({ message: 'Require an number array' })
  readonly accessIds: number[];
}
