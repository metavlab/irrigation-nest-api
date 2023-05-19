import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class RequestIdsDto {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'id numbers',
  })
  @IsNumber({}, { each: true })
  @IsArray({
    message: 'ids require an number array',
  })
  @ArrayNotEmpty({ message: 'ids require an number array' })
  ids: number[];
}
