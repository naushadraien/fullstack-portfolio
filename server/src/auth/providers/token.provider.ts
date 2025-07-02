import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import { AuthJWTPayload } from 'types/auth-jwt-payload.types';
import { JwtService } from '@nestjs/jwt';
import refreshConfig from '../config/refresh.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly hashProvider: HashingProvider,

    private readonly jwtService: JwtService,

    @Inject(refreshConfig.KEY)
    private readonly refreshTokenConfiguration: ConfigType<
      typeof refreshConfig
    >,
  ) {}

  async generateTokens(userId: string) {
    const payload: AuthJWTPayload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfiguration),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtUser(userId: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new UnauthorizedException('User not found!');
    return { id: user.id, email: user.email };
  }

  async refresh(userId: string) {
    const { accessToken, refreshToken } = await this.generateTokens(userId);
    const hashedRefreshToken =
      await this.hashProvider.hashRefreshToken(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findUserById(userId);
    if (!user) throw new NotFoundException('User not found!');
    const isRefreshTokenMatched = await this.hashProvider.compareRefreshToken(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenMatched)
      throw new UnauthorizedException('Invalid refresh token');

    delete user.password;
    delete user.hashedRefreshToken;

    return user;
  }
}
