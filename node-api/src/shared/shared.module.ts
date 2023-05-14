import { Global, Module } from '@nestjs/common';

import { ApiAuthService } from './services/api-auth/api-auth.service';
import { ToolsService } from './services/tools/tools.service';

@Global()
@Module({
  providers: [ApiAuthService, ToolsService],
  exports: [ApiAuthService, ToolsService],
})
export class SharedModule {}
