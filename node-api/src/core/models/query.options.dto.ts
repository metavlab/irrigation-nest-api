import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IQueryOptions } from '../interfaces/query.options.interface';

export class QueryOptionsDto implements IQueryOptions {
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
