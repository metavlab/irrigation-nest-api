import { Injectable, Logger, RequestMethod } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import {
  IPermission,
  META_PERMISSION_MODULE,
  META_REGIST_DYNAMIC_ROUTE,
  SWAGGER_DECORATORS,
} from '../permission.types';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { METHOD_METADATA, PATH_METADATA } from '@nestjs/common/constants';

import { buildResourceNo, composeUrl } from 'src/utils/url.util';
import { ApiOperationOptions } from '@nestjs/swagger';

@Injectable()
export class CollectionsPermissionService {
  private readonly logger = new Logger(CollectionsPermissionService.name);
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  public allPermissionList(): Promise<IPermission[] | never> {
    return this.collectionsPermissionByScan();
  }

  private async collectionsPermissionByScan(): Promise<IPermission[] | never> {
    this.logger.log('Begin collections permission info...');
    const resourcelist: Array<IPermission> = [];

    const wrappers: InstanceWrapper[] = this.discoveryService.getControllers();
    for (const wrapper of wrappers) {
      const { instance } = wrapper;

      const controllerName = wrapper.name;

      if (!instance) {
        return;
      }

      const methodNames: string[] =
        await this.metadataScanner.getAllMethodNames(instance);

      const baseUrl = Reflect.getMetadata(PATH_METADATA, instance.constructor);
      const moduleName: string = Reflect.getMetadata(
        META_PERMISSION_MODULE,
        instance.constructor,
      );
      const dynamicRegistPath: string = Reflect.getMetadata(
        META_REGIST_DYNAMIC_ROUTE,
        instance.constructor,
      );

      for (const _methodName of methodNames) {
        const methodPath: string = this.reflector.get(
          PATH_METADATA,
          instance[_methodName],
        );
        const methodModuleName = Reflect.getMetadata(
          META_PERMISSION_MODULE,
          instance[_methodName],
        );

        const apiOperation: ApiOperationOptions =
          this.reflector.get<ApiOperationOptions>(
            SWAGGER_DECORATORS.API_OPERATION,
            instance[_methodName],
          );

        const reqMethod = this.reflector.get(
          METHOD_METADATA,
          instance[_methodName],
        );

        const method: string = RequestMethod[reqMethod];
        if (method && moduleName && (baseUrl || methodPath)) {
          const url: string = composeUrl(methodPath, baseUrl, {
            registPrefix: dynamicRegistPath,
          });
          const resourceNo = buildResourceNo(url, reqMethod);

          const methodDesc: string = apiOperation?.summary;

          const permisson: IPermission = {
            resourceNo,
            moduleName: methodModuleName || moduleName,
            controllerName,
            controllerRoute: baseUrl,
            methodName: _methodName,
            methodDesc,
            method,
            url,
          };
          resourcelist.push(permisson);
        }
      }
    }

    return resourcelist;
  }
}
