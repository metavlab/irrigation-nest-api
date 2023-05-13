import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryOptionsDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Number of items displayed per page',
  })
  @IsOptional()
  readonly pageSize?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Current page number',
  })
  @IsOptional()
  readonly pageNumber?: number;
}
