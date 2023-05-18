import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, In, Not, Repository } from 'typeorm';
import { AccessEntity, RoleAccessEntity, RoleEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { RoleAccessDto } from './dto/role.access.dto';
import { ICurrentUser } from 'src/decorators';
import { RolePermissionVo } from '../vo/role.permission.vo';
import { ResourceEntity } from '../../entities/resource.entity';

@Injectable()
export class RoleAccessService {
  constructor(
    @InjectRepository(RoleAccessEntity)
    private readonly roleAccessRepository: Repository<RoleAccessEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAccessPermissionByRole(
    roleId: number,
    user: ICurrentUser,
  ): Promise<RolePermissionVo[] | never> {
    const { id } = user;
    const result = await this.roleAccessRepository
      .createQueryBuilder('role_access')
      .leftJoinAndSelect(
        ResourceEntity,
        'resource',
        'role_access.resourceNo = resource.resourceNo',
      )
      .select([
        'role_access.roleId as roleId',
        'role_access.accessId as accessId',
        'resource.resourceNo as resourceNo',
        'resource.moduleName as moduleName',
        'resource.controllerName as controllerName',
        'resource.methodName as methodName',
        'resource.method as method',
        'resource.url as url',
      ])
      .where({
        roleId: roleId,
      })
      .getRawMany();

    console.log(result);

    return result?.map((o) => ({
      roleId,
      userId: id,
      resourceNo: o.resourceNo,
      moduleName: o.moduleName,
      controllerName: o.controllerName,
      methodName: o.methodName,
      method: o.method,
      url: o.url,
    }));
  }

  /**
   *
   * @param roleId
   * @param accessIds
   */
  public async batchCreateForRole(
    roleId: number,
    accessIds: number[],
  ): Promise<RoleAccessEntity[] | never> {
    const existEntities = await this.findExistByRole(roleId, accessIds);
    const inserts: AccessEntity[] = await this.validateAccess(accessIds);
    if (!inserts?.length) {
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_UNFOUND,
          `No available AccessIds,please refresh access list again`,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    let createEntities: RoleAccessDto[] = inserts.map(
      ({ id, resourceNo }: AccessEntity) => ({
        accessId: id,
        resourceNo,
        roleId,
      }),
    );
    if (existEntities?.length) {
      createEntities = createEntities.filter(
        (v) => !existEntities.find((e) => e.resourceNo === v.resourceNo),
      );
    }
    if (!createEntities?.length) {
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_UNFOUND,
          `No available AccessIds,please refresh access list again`,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    const result: RoleAccessEntity[] =
      this.roleAccessRepository.create(createEntities);

    return await this.roleAccessRepository.save(result);
  }

  public async batchRemoveForRole(
    roleId: number,
    accessIds: number[],
  ): Promise<number | never> {
    const { affected } = await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(RoleAccessEntity)
      .where({
        roleId: roleId,
        accessId: In(accessIds),
      })
      .execute();
    return affected;
  }

  public async cleanNotInByRole(
    roleId: number,
    accessIds: number[],
  ): Promise<number | never> {
    const needRemoves: Pick<RoleAccessEntity, 'id'>[] =
      await this.roleAccessRepository.find({
        where: {
          roleId: roleId,
          accessId: Not(In(accessIds)),
        },
        select: { id: true },
      });
    console.log(needRemoves);
    if (!needRemoves?.length) return 0;

    const { affected } = await this.roleAccessRepository.delete(
      needRemoves.map((v) => v.id),
    );

    return affected;
  }

  public async validateRole(roleId: number): Promise<boolean> {
    const role: Pick<RoleEntity, 'id' | 'name'> =
      await this.roleRepository.findOneBy({ id: roleId });

    if (!role)
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_UNFOUND,
          `Role id ${roleId} unfound`,
        ),
        HttpStatus.BAD_REQUEST,
      );

    return true;
  }

  private async findExistByRole(
    roleId: number,
    accessIds: number[],
  ): Promise<RoleAccessEntity[] | never> {
    const result = await this.roleAccessRepository
      .createQueryBuilder('role_access')
      .leftJoinAndSelect('access', 'access', 'role_access.accessId = access.id')
      .leftJoinAndSelect(
        'resource',
        'resource',
        'resource.resourceNo = access.resourceNo',
      )
      .select()
      .addSelect('resource.resourceNo as resourceNo')
      .where('role_access.roleId = :roleId', { roleId })
      .andWhere('role_access.accessId IN (:...ids)', { ids: accessIds })
      .getMany();

    return result;
  }

  private async validateAccess(
    accessIds: number[],
  ): Promise<AccessEntity[] | never> {
    const result = await this.dataSource
      .getRepository(AccessEntity)
      .createQueryBuilder('access')
      .select()
      .leftJoinAndSelect(
        'resource',
        'resource',
        'resource.resourceNo = access.resourceNo',
      )
      .andWhere('access.id IN (:...ids)', { ids: accessIds })
      .getMany();

    return result;
  }
}
