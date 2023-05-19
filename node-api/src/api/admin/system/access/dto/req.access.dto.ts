import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { QueryOptionsDto } from 'src/core/models';

export class ReqAccessDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: 'Parent Id' })
  @IsOptional()
  parentId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource status,1:available,0:unavailable',
  })
  @IsOptional()
  status?: number;
}
