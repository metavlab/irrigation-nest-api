import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login.controller';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities';

// import { UserService } from '../common/services/user/user.service';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_KEY'),
    //     signOptions: {
    //       issuer: config.get<string>('JWT_ISSUER', 'anglar.dev'),
    //       expiresIn: config.get<string>('JWT_EXPIREIN', '180d'),
    //     },
    //   }),
    // }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [LoginController],
  providers: [],
  exports: [],
})
export class AuthModule {}
