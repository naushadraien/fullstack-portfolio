import { Injectable } from '@nestjs/common';
import { ActiveUserData } from 'src/common/decorators/active-user.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenProvider } from './providers/token.provider';
import { UserProvider } from './providers/user.provider';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProvider: UserProvider,
    private readonly tokenProvider: TokenProvider,
  ) {}

  async validateUser(email: string, password: string) {
    return await this.userProvider.validateUser(email, password);
  }

  async validateJwtUser(userId: string) {
    return await this.tokenProvider.validateJwtUser(userId);
  }
  async validateRefreshToken(userId: string, refreshToken: string) {
    return await this.tokenProvider.validateRefreshToken(userId, refreshToken);
  }

  async registerUser(createUserDto: CreateUserDto) {
    return await this.userProvider.registerUser(createUserDto);
  }

  async loginUser(user: ActiveUserData) {
    return await this.userProvider.login(user);
  }

  async logOut(userId: string) {
    return await this.userProvider.logOut(userId);
  }
}
