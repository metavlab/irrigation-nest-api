import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleAccessEntity, UserRoleEntity } from 'src/api/admin/entities';

import { ResourceEntity } from 'src/api/admin/entities/resource.entity';
import { IPermissionCache } from 'src/common';
import { ICurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ApiAuthService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async validApiPermission(
    user: ICurrentUser,
    method: string,
    url: string,
    resourceNo: string,
  ): Promise<boolean> {
    const { isSuper } = user;
    console.log(
      '>>TODO>>validApiPermission>>>>>>>',
      user,
      method,
      url,
      resourceNo,
    );

    if (isSuper) return true;

    const permissions: IPermissionCache[] = await this.loadAllPerssionByUser(
      user,
    );

    if (
      !permissions?.length ||
      !permissions?.find((p) => p.resourceNo === resourceNo)
    ) {
      throw new HttpException(
        getBizError(ErrorCodeEnum.API_AUTH_FORBIDDEN),
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }

  private async loadAllPerssionByUser(
    user: ICurrentUser,
  ): Promise<IPermissionCache[] | never> {
    const { id } = user;
    const roles = await this.dataSource
      .getRepository(UserRoleEntity)
      .find({ where: { userId: Number(id) } });

    if (!roles?.length) return [];
    const result = await this.userRoleRepository
      .createQueryBuilder('user_role')
      .leftJoinAndSelect(
        RoleAccessEntity,
        'role_access',
        'user_role.roleId = role_access.roleId',
      )
      .leftJoinAndSelect(
        ResourceEntity,
        'resource',
        'role_access.resourceNo = resource.resourceNo',
      )
      .select([
        'user_role.userId as userId',
        'user_role.roleId as roleId',
        'resource.resourceNo as resourceNo',
        'resource.method as method',
      ])
      .where({
        userId: id,
      })
      .getRawMany();

    return result?.map((r) => ({
      userId: id,
      roleId: r.roleId,
      resourceNo: r.resourceNo,
      method: r.method,
    }));
  }
}
