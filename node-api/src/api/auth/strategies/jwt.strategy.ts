import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from '../auth.helper';
import { ConfigService } from '@nestjs/config';
import { AuthCredentialsPayload } from 'src/api/types/auth.credentials.type';
import { ICurrentUser } from 'src/decorators/current-user/current-user.decorator';

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

  /**
   * validate user in DB
   * @param payload
   * @returns user
   */
  private validate(
    payload: AuthCredentialsPayload,
  ): Promise<ICurrentUser | never> {
    return this.helper.validateUser(payload);
  }
}
