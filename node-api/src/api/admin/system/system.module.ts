import { Module } from '@nestjs/common';
import { RoleController } from './role/role.controller';
import { AccountRoleController } from './account-role/account-role.controller';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleService } from './role/role.service';
import { AccessEntity } from './entities/access.entity';
import { RoleAccessEntity } from './entities/role-access.entity';
import { RoleAccessService } from './role-access/role-access.service';
import { RoleAccessController } from './role-access/role-access.controller';
import { AccessService } from './access/access.service';
import { AccessController } from './access/access.controller';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        module: SystemModule,
      },
    ]),
    TypeOrmModule.forFeature([RoleEntity, AccessEntity, RoleAccessEntity]),
  ],
  controllers: [RoleController, AccountRoleController, RoleAccessController, AccessController],
  providers: [RoleService, RoleAccessService, AccessService],
})
export class SystemModule {}
