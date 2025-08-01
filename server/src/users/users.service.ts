import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto;
    const hashedPassword = await this.hashingProvider.hashPassword(password);
    return this.prismaService.extendedPrismaClient().user.create({
      data: {
        password: hashedPassword,
        ...user,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.extendedPrismaClient().user.findUnique({
      where: {
        email,
      },
    });
  }
  async findUserById(userId: string) {
    const user = await this.prismaService
      .extendedPrismaClient()
      .user.findUnique({
        where: {
          id: userId,
        },
      });
    if (user) {
      delete user.password;
    }
    return user;
  }
  async updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ) {
    return await this.prismaService.extendedPrismaClient().user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }
}
