import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleEntity } from '../../../../core/entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  Equal,
  IsNull,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateRoleDto } from './dto/create.role.dto';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { ReqRoleDto } from './dto/req.role.dto';
import { RoleListVo, RoleVo } from '../vo/role.vo';
import { PageEnum, RoleEnum, StatusEnum } from 'src/enums';
import { mapToObj } from 'src/utils';
import { UpdateRoleDto } from './dto/update.role.dto';
import { RoleAccessEntity, UserRoleEntity } from 'src/core/entities';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async insertSaveRole(dto: CreateRoleDto): Promise<RoleEntity> {
    const find: RoleEntity = await this.findByName(dto.name);
    if (find)
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_CONFLICT,
          `Role name [${dto.name}] conflict`,
        ),
        HttpStatus.CONFLICT,
      );
    const role: RoleEntity = await this.roleRepository.save(
      this.roleRepository.create({
        ...dto,
        isDefault: 0,
      }),
    );

    return role;
  }

  public async findByName(name: string): Promise<RoleEntity | never> {
    return await this.roleRepository.findOneBy({ name });
  }

  public async roleList(dto: ReqRoleDto): Promise<RoleListVo> {
    const {
      pageNumber = PageEnum.PAGE_NUMBER,
      pageSize = PageEnum.PAGE_SIZE,
      name,
      description,
      isDefault,
      status,
    } = dto;

    const query = new Map();
    query.set('deletedAt', IsNull());

    if (name) {
      query.set('name', Like(`%${name}`));
    }
    if (description) {
      query.set('description', Like(`%${description}%`));
    }
    if ([StatusEnum.NORMAL, StatusEnum.FORBIDDEN].includes(Number(status))) {
      query.set('status', Equal(status));
    }

    if (isDefault && [0, 1].includes(isDefault)) {
      query.set('isDefault', Number(isDefault));
    }

    const [data, total] = await this.dataSource
      .createQueryBuilder(RoleEntity, 'role')
      .where(mapToObj(query))
      // .andWhere('role.is_deleted = :isDeleted', { isDeleted: 0 })
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .printSql()
      .getManyAndCount();

    return {
      pageSize,
      pageNumber,
      total,
      data,
    };
  }

  public async roleById(id: number): Promise<RoleVo | never> {
    return await this.roleRepository.findOneBy({ id });
  }

  public async modifyRoleById(
    id: number,
    updateDto: UpdateRoleDto,
  ): Promise<number | never> {
    const { isDefault } = updateDto;
    if (isDefault === RoleEnum.DEFAULT) {
      const findDefault = await this.roleRepository.findOne({
        where: { isDefault },
        select: ['id'],
      });

      if (findDefault && Number(findDefault?.id) !== id) {
        throw new HttpException(
          getBizError(
            ErrorCodeEnum.DATA_RECORD_CONFLICT,
            `Default role only one in system`,
          ),
          HttpStatus.CONFLICT,
        );
      }
    }

    const { affected } = await this.roleRepository.update(id, updateDto);

    return affected;
  }

  public async destoryRoleById(id: number): Promise<number | never> {
    const role: RoleEntity = await this.roleRepository.findOneBy({ id });
    if (!role || role.deletedAt) {
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_CONFLICT,
          `role [${id}] not found or has been soft deleted`,
        ),
        HttpStatus.CONFLICT,
      );
    }

    const { affected } = await this.roleRepository.softDelete(id);

    return affected;
  }

  public async restoreRoleById(id: number): Promise<number | never> {
    const { affected }: UpdateResult = await this.dataSource
      .createQueryBuilder(RoleEntity, 'role')
      .restore()
      .where('id = :id', { id })
      .execute();

    return affected;
  }

  public async validateRoleAccessRelation(
    roleId: number,
  ): Promise<number | never> {
    const findCount: number = await this.dataSource
      .getRepository(RoleAccessEntity)
      .countBy({
        roleId: roleId,
      });

    return findCount;
  }

  public async validateUserRoleRelation(
    roleId: number,
  ): Promise<number | never> {
    const findCount: number = await this.dataSource
      .getRepository(UserRoleEntity)
      .countBy({
        roleId: roleId,
      });
    return findCount;
  }
}
