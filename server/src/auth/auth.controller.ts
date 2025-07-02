import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ActiveUser,
  ActiveUserData,
} from 'src/common/decorators/active-user.decorator';
import { ExcludeFields } from 'src/common/decorators/exclude-fields.decorator';
import { ExcludeFieldsInterceptor } from 'src/interceptors/exclude-fields.interceptor';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { TokenProvider } from './providers/token.provider';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenProvider: TokenProvider,
  ) {}

  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account with email, password, and optional name',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    example: {
      id: '40a47dc0-6f89-4a09-82ef-83c8a02bcef9',
      email: 'john.doe@example.com',
      name: 'John Doe',
      createdAt: '2025-07-02T15:41:08.765Z',
      updatedAt: '2025-07-02T15:41:08.765Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Validation failed',
    example: {
      statusCode: 400,
      message: [
        'Email must be a valid email address',
        'Password must be at least 8 characters long',
      ],
      error: 'Bad Request',
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email already exists',
    example: {
      statusCode: 409,
      message: 'User with this email already exists',
      error: 'Conflict',
    },
  })
  @UseInterceptors(ExcludeFieldsInterceptor)
  @Public()
  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registerUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Login user',
    description:
      'Authenticates user with email and password, returns access and refresh tokens',
  })
  @ApiBody({
    description: 'User login credentials',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'john.doe@example.com',
        },
        password: {
          type: 'string',
          format: 'password',
          example: 'SecurePass123!',
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    example: {
      id: '9bb4cafd-7152-469e-b5e7-8d4ebbb8d1ff',
      accessToken: 'nfbgjdfkjfkjdgkjfdkjgbkjdfbkgbdfgl',
      refreshToken: 'gbfjgbfdbjgd',
      email: 'john.doe@example.com',
      name: 'John Doe',
      createdAt: '2025-07-02T15:27:27.508Z',
      updatedAt: '2025-07-02T15:29:26.647Z',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    example: {
      statusCode: 401,
      message: 'Invalid email or password',
      error: 'Unauthorized',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Missing credentials',
    example: {
      statusCode: 400,
      message: 'Email and password are required',
      error: 'Bad Request',
    },
  })
  @UseInterceptors(ExcludeFieldsInterceptor)
  @ExcludeFields('password', 'hashedRefreshToken')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@ActiveUser() user: ActiveUserData) {
    return this.authService.loginUser(user);
  }

  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Uses refresh token to generate a new access token and refresh token pair',
  })
  @ApiBody({
    description: 'Refresh token',
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          description: 'Valid refresh token',
        },
      },
      required: ['refreshToken'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens successfully refreshed',
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      expiresIn: 3600,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token',
    example: {
      statusCode: 401,
      message: 'Invalid refresh token',
      error: 'Unauthorized',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Refresh token expired',
    example: {
      statusCode: 403,
      message: 'Refresh token has expired',
      error: 'Forbidden',
    },
  })
  @Public()
  @UseGuards(RefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@ActiveUser() user: ActiveUserData) {
    return this.tokenProvider.refresh(user.id);
  }

  @ApiOperation({
    summary: 'Logging out the user',
    description: 'This can be used to logging out the user',
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    example: {
      message: 'John Doe has been logged out successfully',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid or expired refresh token',
    example: {
      statusCode: 401,
      message: 'Invalid refresh token',
      error: 'Unauthorized',
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Refresh token expired',
    example: {
      statusCode: 403,
      message: 'Refresh token has expired',
      error: 'Forbidden',
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@ActiveUser() user: ActiveUserData) {
    return await this.authService.logOut(user.id);
  }
}
