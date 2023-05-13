import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { RouterModule } from '@nestjs/core';
import { AccountService } from './account/account.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'admin',
        module: SystemModule,
      },
    ]),
  ],
  controllers: [AccountController, LoginController],
  providers: [AccountService, LoginService],
})
export class SystemModule {}
