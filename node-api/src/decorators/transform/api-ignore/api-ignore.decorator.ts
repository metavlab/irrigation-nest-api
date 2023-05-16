export const ApiTransformIgnoreName = Symbol('PROPS_API_TRANSFORM_IGNORE');
export function ApiIgnoreTransform() {
  return function (
    _target,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value[ApiTransformIgnoreName] = true;
  };
}
