import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
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
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      email: 'john.doe@example.com',
      name: 'John Doe',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      createdAt: '2025-07-01T12:00:00.000Z',
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
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      email: 'john.doe@example.com',
      name: 'John Doe',
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
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
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(
    @Request()
    req: {
      user: User;
    },
  ) {
    return this.authService.loginUser(req.user);
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
  @Post('refresh')
  refresh(
    @Request()
    req: {
      user: User;
    },
  ) {
    return this.tokenProvider.refresh(req.user.id, req.user.name);
  }
}
