import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRoleEntity } from 'src/core/entities';
import { ICurrentUser } from 'src/decorators';
import { ErrorCodeEnum, getBizError } from 'src/errors';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class AccountRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async currentUserRoles(
    user: ICurrentUser,
  ): Promise<UserRoleEntity[] | never> {
    if (!user?.id) {
      throw new HttpException(
        getBizError(
          ErrorCodeEnum.TOKEN_AUTHENCATION_INVALID,
          `Current user token expiration`,
        ),
        HttpStatus.FORBIDDEN,
      );
    }
    const roles: UserRoleEntity[] = await this.userRoleRepository.find({
      where: { userId: Number(user.id) },
    });

    return roles;
  }

  public async createUserRole(
    userId: number,
    roleIds: number[],
  ): Promise<number | never> {
    const user: UserEntity = await this.dataSource
      .getRepository(UserEntity)
      .findOne({
        where: { id: userId },
      });
    if (!user)
      throw new HttpException(
        getBizError(ErrorCodeEnum.DATA_RECORD_UNFOUND),
        HttpStatus.BAD_REQUEST,
      );

    const exists = await this.userRoleRepository.find({
      where: {
        userId: userId,
        roleId: In(roleIds),
      },
    });

    const creates = roleIds.filter(
      (id) => !exists.find((o) => Number(o.roleId) === id),
    );
    if (!creates.length) return 0;

    const saves = this.userRoleRepository.create(
      creates.map((id) => ({
        userId: userId,
        roleId: Number(id),
      })),
    );

    const results = await this.userRoleRepository.save(saves);

    return results?.length;
  }
}
