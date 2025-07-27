import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import jwtConfig from '../config/jwt.config';
import { AuthJWTPayload } from 'types/auth-jwt-payload.types';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // First try to extract from Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Then try to extract from cookies
        (request: Request) => {
          return request?.cookies?.accessToken || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfiguration.secret,
    });
  }

  async validate(payload: AuthJWTPayload) {
    const userId = payload.sub;
    const user = await this.authService.validateJwtUser(userId);
    return user;
  }
}
