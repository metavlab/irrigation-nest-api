import { Global, Module } from '@nestjs/common';

import { ToolsService } from './services/tools/tools.service';
import { ApiAuthService } from './services/api-auth/api-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from 'src/api/admin/entities/access.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccessEntity])],
  providers: [ToolsService, ApiAuthService],
  exports: [ToolsService, ApiAuthService],
})
export class SharedModule {}
