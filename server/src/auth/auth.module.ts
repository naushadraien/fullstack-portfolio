import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import jwtConfig from './config/jwt.config';
import refreshConfig from './config/refresh.config';
import { Argon2Provider } from './providers/argon2.provider';
import { HashingProvider } from './providers/hashing.provider';
import { TokenProvider } from './providers/token.provider';
import { UserProvider } from './providers/user.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CookieProvider } from './providers/cookie.provider';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: Argon2Provider,
    },
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
    UserProvider,
    TokenProvider,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CookieProvider,
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
