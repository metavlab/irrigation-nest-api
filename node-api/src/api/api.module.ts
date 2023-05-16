import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AuthModule, UserModule, AdminModule],
  exports: [AuthModule],
})
export class ApiModule {}
