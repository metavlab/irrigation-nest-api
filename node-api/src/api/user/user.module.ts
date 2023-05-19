import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CommonUserService } from './services/common-user.service';

@Module({
  controllers: [UserController],
  providers: [CommonUserService],
})
export class UserModule {}
