import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ActiveUserData } from 'src/common/decorators/active-user.decorator';
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

    delete user.password;
    delete user.hashedRefreshToken;

    return user;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const existedUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existedUser) throw new ConflictException('User already exists');
    return await this.usersService.create(createUserDto);
  }

  async login(user: ActiveUserData) {
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
    const user = await this.usersService.updateHashedRefreshToken(userId, null);

    return {
      message: `${user.name} has been logged out successfully`,
    };
  }
}
