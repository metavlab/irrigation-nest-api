import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessEntity } from 'src/api/admin/entities/access.entity';
import { ICurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { Repository } from 'typeorm';

@Injectable()
export class ApiAuthService {
  constructor(
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
  ) {}

  public async validApiPermission(
    user: ICurrentUser,
    method: string,
    url: string,
  ): Promise<boolean> {
    const { isSuper } = user;
    console.log('>>>>validApiPermission>>>>>>>', user, method, url);

    if (isSuper) return true;

    return Promise.resolve(true);
  }
}
