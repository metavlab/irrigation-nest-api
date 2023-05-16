import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthModulePropertyName, PublicApiPropertyName } from 'src/decorators';
import { ApiAuthService } from 'src/shared/services/api-auth/api-auth.service';

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

    const { user, method, url }: Request = context.switchToHttp().getRequest();
    if (!user) return false;

    //Valid api permission
    const methodAuth = this.refector.get<string>(
      AuthModulePropertyName,
      context.getHandler(),
    );

    const classAuth = this.refector.get<string>(
      AuthModulePropertyName,
      context.getClass(),
    );
    if (methodAuth || classAuth) {
      await this.apiAuthService.validApiPermission(user, method, url);
    }

    return true;
  }
}
