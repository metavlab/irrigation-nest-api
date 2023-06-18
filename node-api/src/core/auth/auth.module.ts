import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [LoginController],
  providers: [],
  exports: [],
})
export class AuthModule {}
