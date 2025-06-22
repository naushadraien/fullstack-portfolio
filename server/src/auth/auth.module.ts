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
import { ValidateUserProvider } from './providers/validate-user.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

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
    ValidateUserProvider,
    TokenProvider,
  ],
  exports: [HashingProvider],
})
export class AuthModule {}
