import { Global, Module } from '@nestjs/common';
import { ToolsService } from './services/tools/tools.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ApiAuthService } from './services/api-auth/api-auth.service';
import { ResourceEntity, RoleAccessEntity, UserRoleEntity } from '../entities';
import { CollectionsResourceModule } from './collections-resource/collections-resource.module';
import { ResourceService } from './services/resource/resource.service';
import { AuthHelper } from './services/auth/auth.helper';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { JwtStrategy } from './services/strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_KEY'),
        signOptions: {
          issuer: config.get<string>('JWT_ISSUER', 'anglar.dev'),
          expiresIn: config.get<string>('JWT_EXPIREIN', '180d'),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      UserRoleEntity,
      RoleAccessEntity,
      ResourceEntity,
    ]),
    CollectionsResourceModule,
  ],
  providers: [
    ToolsService,
    ApiAuthService,
    ResourceService,
    AuthHelper,
    AuthService,
    UserService,
    JwtStrategy,
  ],
  exports: [ToolsService, ApiAuthService, UserService, AuthHelper, AuthService],
})
export class CommonModule {}
