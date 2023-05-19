import { Module } from '@nestjs/common';
import { RoleController } from './role/role.controller';
import { AccountRoleController } from './account/controllers/account-role.controller';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role/role.service';
import { RoleAccessService } from './role-access/role-access.service';
import { RoleAccessController } from './role-access/role-access.controller';
import { AccessService } from './access/access.service';
import { AccessController } from './access/access.controller';
import { AccountRoleService } from './account/services/account.role.service';
import {
  AccessEntity,
  ResourceEntity,
  RoleAccessEntity,
  RoleEntity,
  UserRoleEntity,
} from 'src/core/entities';
import { RegistController } from './regist/regist.controller';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        module: SystemModule,
      },
    ]),
    TypeOrmModule.forFeature([
      RoleEntity,
      AccessEntity,
      RoleAccessEntity,
      ResourceEntity,
      UserRoleEntity,
    ]),
  ],
  controllers: [
    RoleController,
    AccountRoleController,
    RoleAccessController,
    AccessController,
    RegistController,
  ],
  providers: [
    RoleService,
    RoleAccessService,
    AccessService,
    AccountRoleService,
  ],
})
export class SystemModule {}
