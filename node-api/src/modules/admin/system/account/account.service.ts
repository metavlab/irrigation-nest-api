import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountService {
  private logger: Logger = new Logger(AccountService.name);

  constructor(private readonly dataSource: DataSource) {}
}
