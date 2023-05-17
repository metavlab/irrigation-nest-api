import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AccessEntity, RoleAccessEntity, RoleEntity } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { RoleAccessDto } from './dto/role.access.dto';

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

  /**
   *
   * @param roleId
   * @param accessIds
   */
  public async batchApproveForRole(
    roleId: number,
    accessIds: number[],
  ): Promise<RoleAccessEntity[] | never> {
    await this.validateRole(roleId);

    const inserts: AccessEntity[] = await this.validateAccess(accessIds);
    if (!inserts?.length)
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.DATA_RECORD_UNFOUND,
          `No available AccessIds,please refresh access list again`,
        ),
        HttpStatus.BAD_REQUEST,
      );

    const createEntities: RoleAccessDto[] = inserts.map(
      ({ id, resourceNo }: AccessEntity) => ({
        accessId: id,
        resourceNo,
        roleId,
      }),
    );

    const result: RoleAccessEntity[] =
      this.roleAccessRepository.create(createEntities);

    return await this.roleAccessRepository.save(result);
  }

  private async validateRole(roleId: number): Promise<boolean> {
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
