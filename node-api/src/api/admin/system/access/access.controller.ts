import { Body, Controller, Post } from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create.access.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessEntity } from '../entities/access.entity';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Access Resource`)
@Controller('access')
export class AccessController {
  constructor(private readonly service: AccessService) {}

  @ApiOperation({
    summary: 'create access resource',
    description: 'create access resource',
  })
  @ApiOkResponse({
    type: AccessEntity,
    description: 'Created Access Object data',
  })
  @Post()
  public createAccess(
    @Body() createDto: CreateAccessDto,
  ): Promise<AccessEntity | never> {
    return this.service.createAccessData(createDto);
  }
}
