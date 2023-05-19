import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { AuthHelper } from 'src/core/common/services/auth/auth.helper';
import { ICurrentUser, JwtAccessPayload } from 'src/core/interfaces';

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
  private validate(payload: JwtAccessPayload): Promise<ICurrentUser | never> {
    return this.helper.validateUser(payload);
  }
}
