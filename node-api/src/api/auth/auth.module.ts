import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHelper } from './auth.helper';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
        signOptions: {
          issuer: config.get<string>('JWT_ISSUER', 'anglar.dev'),
          expiresIn: '360d' || config.get<string>('JWT_EXPIREIN', '180d'),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [],
})
export class AuthModule {}
