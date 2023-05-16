import { applyDecorators, SetMetadata } from '@nestjs/common';

export const AuthModulePropertyName = Symbol('PROPS_PERMISSION_MODULE');

export const AuthModule = (name: string): MethodDecorator & ClassDecorator => {
  return applyDecorators(SetMetadata(AuthModulePropertyName, name));
};
