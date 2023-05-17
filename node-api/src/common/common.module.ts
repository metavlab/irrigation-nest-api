import { Module } from '@nestjs/common';
import { CollectionsPermissionModule } from './collections-permission/collections-permission.module';

@Module({
  imports: [CollectionsPermissionModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
