import { Global, Module } from '@nestjs/common';
import { CollectionsPermissionService } from './services/collections.permission.service';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [CollectionsPermissionService],
  exports: [CollectionsPermissionService, CollectionsPermissionModule],
})
export class CollectionsPermissionModule {}
