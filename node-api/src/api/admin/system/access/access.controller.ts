import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AccessService } from './access.service';
import { CreateAccessDto } from './dto/create.access.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessEntity } from '../../entities/access.entity';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';
import { ReqAccessDto } from './dto/req.access.dto';
import { AccessListVo, AccessVo } from '../vo/access.vo';
import { PermissionModule, RegistDynamicRoute } from 'src/common';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Access Resource`)
@Controller('access')
@PermissionModule('访问权限管理')
@RegistDynamicRoute('admin')
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

  @ApiOkResponse({
    type: AccessVo,
    isArray: true,
    description: 'return all access resource for binding role',
  })
  @HttpCode(HttpStatus.OK)
  @Get('access_all')
  public allList(): Promise<AccessVo[]> {
    return this.service.getAllAccessList();
  }

  @ApiOperation({
    summary: 'Get Access records pagination',
    externalDocs: {
      url: 'xxx?pageSize=10&pageNumber=1',
    },
  })
  @ApiOkResponse({ type: AccessListVo, description: 'query access pagination' })
  @Get()
  public getAccessListByParent(
    @Query() reqDto: ReqAccessDto,
  ): Promise<AccessListVo> {
    return this.service.accessList(reqDto);
  }
}
