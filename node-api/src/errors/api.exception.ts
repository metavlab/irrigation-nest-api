//TODO https://github.com/nanogiants/nestjs-swagger-api-exception-decorator/issues/1
import type {
  ResponseObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type Func = () => void;
export interface ApiExceptionOptions
  extends Omit<ResponseObject, 'description'> {
  description?: string;
  type?: Func | [Func];
  isArray?: boolean;
  schema?: SchemaObject;
}
