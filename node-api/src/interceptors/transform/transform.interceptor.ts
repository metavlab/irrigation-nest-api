import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ClsService } from 'nestjs-cls';
import { Observable, map } from 'rxjs';
import { ApiTransformIgnoreName } from 'src/decorators/transform/api-ignore/api-ignore.decorator';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { user } = context.switchToHttp().getRequest();

    console.log('TransformInterceptor>>>>>>>', user);
    if (user?.id) {
      this.cls.set('userId', user.id);
    }

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
