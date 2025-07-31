import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import * as crypto from 'crypto';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { validateConfig } from './config/env.validation';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { UsersModule } from './users/users.module';

const THROTTLER_CONFIG: {
  name: string;
  ttl: number;
  limit: number;
}[] = [
  {
    name: 'short',
    ttl: 1000, // 1 second
    limit: 3, // 3 requests per second
  },
  {
    name: 'medium',
    ttl: 10000, // 10 seconds
    limit: 20, // 20 requests per 10 seconds
  },
  {
    name: 'long',
    ttl: 60000, // 1 minute
    limit: 100, // 100 requests per minute
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
      validate: validateConfig,
    }),
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot(THROTTLER_CONFIG),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'production'
            ? undefined
            : {
                target: 'pino-pretty',
                options: {
                  translateTime: 'SYS:standard',
                  singleLine: false,
                  colorize: true,
                  ignore:
                    'pid,hostname,req,res,responseTime,req.headers,req.remoteAddress,req.remotePort,res.headers',
                },
              },
        customProps: (req: any) => ({
          requestId: req.headers['x-request-id'],
          userId: req.user?.id,
          method: req.method,
          url: req.url,
        }),
        genReqId: (req) =>
          req.headers['x-request-id'] || crypto.randomBytes(8).toString('hex'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware, RequestLoggerMiddleware).forRoutes('*');
  }
}
