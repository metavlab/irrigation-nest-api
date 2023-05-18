import { Global, Module } from '@nestjs/common';

import { ToolsService } from './services/tools/tools.service';
import { ApiAuthService } from './services/api-auth/api-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RoleAccessEntity,
  UserRoleEntity,
  ResourceEntity,
} from 'src/api/admin/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoleAccessEntity,
      UserRoleEntity,
      ResourceEntity,
    ]),
  ],
  providers: [ToolsService, ApiAuthService],
  exports: [ToolsService, ApiAuthService],
})
export class SharedModule {}
