import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { HashingProvider } from './hashing.provider';
import { TokenProvider } from './token.provider';

@Injectable()
export class UserProvider {
  constructor(
    private readonly hashProvider: HashingProvider,
    private readonly tokenProvider: TokenProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid Credentials!');
    const isPasswordMatched = await this.hashProvider.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatched)
      throw new UnauthorizedException('Invalid Credentials!');

    return user;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const existedUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existedUser) throw new ConflictException('User already exists');
    return await this.usersService.create(createUserDto);
  }

  async login(user: User) {
    const { id: userId, ...rest } = user;
    const { accessToken, refreshToken } =
      await this.tokenProvider.generateTokens(userId);
    const hashedRefreshToken =
      await this.hashProvider.hashRefreshToken(refreshToken);
    await this.usersService.updateHashedRefreshToken(
      userId,
      hashedRefreshToken,
    );
    return {
      id: userId,
      accessToken,
      refreshToken,
      ...rest,
    };
  }

  async logOut(userId: string) {
    return await this.usersService.updateHashedRefreshToken(userId, null);
  }
}
