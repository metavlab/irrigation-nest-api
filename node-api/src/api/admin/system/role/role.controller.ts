import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { ReqRoleDto } from './dto/req.role.dto';
import { RoleListVo } from '../vo/role.vo';
import { UpdateRoleDto } from './dto/update.role.dto';
import { SWAGGER_MOD_ADMIN } from 'src/api/swagger-api.constants';

@ApiTags(`${SWAGGER_MOD_ADMIN} - Roles`)
@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @ApiOperation({
    summary: 'role list',
    description: 'Query role list by name,status,description ed.',
    externalDocs: {
      url: 'role?pageSize=10&pageNumber=1&name=x&status=0',
    },
  })
  @ApiOkResponse({
    type: RoleListVo,
    description: 'list by pager',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  public roleList(@Query() reqDto: ReqRoleDto): Promise<RoleListVo> {
    return this.service.roleList(reqDto);
  }

  @ApiOperation({
    summary: 'Create role',
    description: 'Add role into database',
  })
  @ApiResponse({ type: RoleEntity, description: 'created role' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public addRole(@Body() roleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.service.insertSaveRole(roleDto);
  }

  @ApiOperation({
    summary: 'Update role',
    description: 'Update role by role id',
  })
  @ApiOkResponse({
    type: Number,
    description: 'Update role affected',
  })
  @HttpCode(HttpStatus.OK)
  @Post(':id/update')
  public modifyRoleById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<number | never> {
    return this.service.modifyRoleById(id, updateRoleDto);
  }

  @ApiOperation({
    summary: 'make role unavailabled',
    description: 'return affected record number',
  })
  @Delete(':id')
  public removeRoleById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<number | never> {
    return this.service.destoryRoleById(id);
  }

  @ApiOperation({
    summary: 'restore role availabled',
    description: 'return affected record number',
  })
  @Post(':id/restore')
  public restoreRoleById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<number | never> {
    return this.service.restoreRoleById(id);
  }
}
