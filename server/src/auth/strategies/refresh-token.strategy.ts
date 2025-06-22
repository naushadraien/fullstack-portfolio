import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { AuthJWTPayload } from 'types/auth-jwt-payload.types';
import refreshConfig from '../config/refresh.config';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshConfig.KEY)
    private refreshTokenConfiguration: ConfigType<typeof refreshConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: refreshTokenConfiguration.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: AuthJWTPayload) {
    const userId = payload.sub;
    const { refreshToken } = req.body;
    const user = await this.authService.validateRefreshToken(
      userId,
      refreshToken,
    );
    return user;
  }
}
