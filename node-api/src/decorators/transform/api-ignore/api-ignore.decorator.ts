export const ApiTransformIgnoreName = Symbol('@@ApiTransformIgnoreName');

export function ApiIgnoreTransform() {
  return function (
    _target,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value[ApiTransformIgnoreName] = true;
  };
}
