import { Injectable } from '@nestjs/common';
import { ValidateUserProvider } from './providers/validate-user.provider';

@Injectable()
export class AuthService {
  constructor(private readonly validateUserProvider: ValidateUserProvider) {}

  async validateUser(email: string, password: string) {
    return await this.validateUserProvider.validateUser(email, password);
  }

  async validateJwtUser(userId: number) {
    return await this.validateJwtUser(userId);
  }
  async validateRefreshToken(userId: number, refreshToken: string) {
    return await this.validateRefreshToken(userId, refreshToken);
  }
}
