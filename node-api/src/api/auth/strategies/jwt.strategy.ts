import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from '../auth.helper';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/api/entities/user.entity';
import { AuthCredentialsPayload } from 'src/api/types/auth.credentials.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_KEY'),
      ignoreExpiration: false,
    });
  }

  private validate(
    payload: AuthCredentialsPayload,
  ): Promise<UserEntity | never> {
    return this.helper.validateUser(payload);
  }
}
