import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { ApiTransformIgnoreName } from 'src/decorators/transform/api-ignore/api-ignore.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ignored = context.getHandler()[ApiTransformIgnoreName];
    return ignored
      ? next.handle()
      : next.handle().pipe(
          map((data: any) => {
            return {
              code: 0,
              message: 'Success',
              result: instanceToPlain(data),
            };
          }),
        );
  }
}
