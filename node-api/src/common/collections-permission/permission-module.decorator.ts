import { SetMetadata, applyDecorators } from '@nestjs/common';
import {
  META_PERMISSION_MODULE,
  META_REGIST_DYNAMIC_ROUTE,
} from './permission.types';
import { DEFAULT_MODULE_NAME } from 'src/config/dev.config';

export const PermissionModule = (
  name: string = DEFAULT_MODULE_NAME,
): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(META_PERMISSION_MODULE, name));
};

export const RegistDynamicRoute = (path?: string): ClassDecorator => {
  return applyDecorators(SetMetadata(META_REGIST_DYNAMIC_ROUTE, path || ''));
};
