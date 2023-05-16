import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/api/admin/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return data && user ? user[data as string] : user;
  },
);

export type ICurrentUser = Partial<
  Omit<UserEntity, 'password' | 'updatedAt' | 'createdAt' | 'deletedAt'>
>;
