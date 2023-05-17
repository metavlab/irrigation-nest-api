import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, ValidateIf } from 'class-validator';

export class AccessDto {
  @ApiPropertyOptional({
    required: false,
    description: 'Module name or Menu name',
  })
  @MaxLength(50, { message: 'Module name require less than 50' })
  @IsString()
  @ValidateIf((o) => o.name != '')
  @IsOptional()
  readonly name?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource action name',
  })
  @MaxLength(50, { message: 'Action name require less than 50' })
  @IsString()
  @ValidateIf((o) => o.actionName != '')
  @IsOptional()
  readonly actionName?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource no',
  })
  @IsString()
  @ValidateIf((o) => o.resourceNo != '')
  @IsOptional()
  readonly resourceNo?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource Icon url',
  })
  @IsString()
  @ValidateIf((o) => o.icon != '')
  @IsOptional()
  readonly icon?: string;

  @ApiPropertyOptional({ required: false, description: 'Access Resource URL' })
  @IsString()
  @ValidateIf((o) => o.url != '')
  @IsOptional()
  readonly url?: string;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource parent ID',
  })
  @ValidateIf((o) => o.parentId != '')
  @IsOptional()
  readonly parentId?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource sort number',
  })
  @ValidateIf((o) => o.sortno != '')
  @IsOptional()
  readonly sortno?: number;

  @ApiPropertyOptional({
    required: false,
    description: 'Access Resource description',
  })
  @MaxLength(100, { message: 'Description require less than 100' })
  @IsString()
  @ValidateIf((o) => o.description != '')
  @IsOptional()
  readonly description?: string;
}
