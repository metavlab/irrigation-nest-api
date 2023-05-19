import { ExecutionContext, Injectable, RequestMethod } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { Reflector } from '@nestjs/core';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PublicApiPropertyName } from 'src/decorators';
import { ApiAuthService } from 'src/core/common/services/api-auth/api-auth.service';
import { buildResourceNo, composeUrl } from 'src/utils/url.util';
import { META_PERMISSION_MODULE, META_REGIST_DYNAMIC_ROUTE } from '../common';

@Injectable()
export class JwtAuthGuard extends Guard('jwt') implements IAuthGuard {
  constructor(
    private readonly refector: Reflector,
    private readonly apiAuthService: ApiAuthService,
  ) {
    super();
  }

  public handleRequest<ICurrentUser>(
    _err: any,
    user: ICurrentUser,
    _info: any,
    _context: ExecutionContext,
    _status?: any,
  ): ICurrentUser {
    return user;
  }

  /**
   *
   * @param context
   * @returns Boolean
   */
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const isPublic = this.refector.get<boolean>(
      PublicApiPropertyName,
      context.getHandler(),
    );
    if (isPublic) return true;

    const { user, method }: Request = context.switchToHttp().getRequest();
    if (!user) return false;

    //Valid api permission
    const methodAuth = this.refector.get<string>(
      META_PERMISSION_MODULE,
      context.getHandler(),
    );

    const classAuth = this.refector.get<string>(
      META_PERMISSION_MODULE,
      context.getClass(),
    );

    if (methodAuth || classAuth) {
      const baseUrl = Reflect.getMetadata(PATH_METADATA, context.getClass());
      const dynamicRegistPath: string = Reflect.getMetadata(
        META_REGIST_DYNAMIC_ROUTE,
        context.getClass(),
      );
      const subPath = Reflect.getMetadata(PATH_METADATA, context.getHandler());
      const url = composeUrl(subPath, baseUrl, {
        registPrefix: dynamicRegistPath,
      });
      const resourceNo: string = buildResourceNo(url, RequestMethod[method]);

      await this.apiAuthService.validApiPermission(
        user,
        method,
        url,
        resourceNo,
      );
    }

    return true;
  }
}
