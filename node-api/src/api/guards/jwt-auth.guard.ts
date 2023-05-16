import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PublicApiPropertyName } from 'src/decorators';

@Injectable()
export class JwtAuthGuard extends Guard('jwt') implements IAuthGuard {
  constructor(private readonly refector: Reflector) {
    super();
  }

  public handleRequest<UserEntity>(
    _err: any,
    user: UserEntity,
    _info: any,
    _context: ExecutionContext,
    _status?: any,
  ): UserEntity {
    return user;
  }
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const isPublic = this.refector.get<boolean>(
      PublicApiPropertyName,
      context.getHandler(),
    );
    if (isPublic) return true;

    const { user }: Request = context.switchToHttp().getRequest();
    return user ? true : false;
  }
}
