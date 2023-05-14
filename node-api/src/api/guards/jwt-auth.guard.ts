import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as Guard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends Guard('jwt') implements IAuthGuard {
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
    const { user }: Request = context.switchToHttp().getRequest();
    return user ? true : false;
  }
}
