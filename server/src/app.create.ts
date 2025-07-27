import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import helmet from 'helmet';
import { corsOptions } from './config/cors-options';
import * as cookieParser from 'cookie-parser';

export function appCreate(app: INestApplication): void {
  app.use(helmet());

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Portfolio Api')
    .setDescription('This is portfolio backend built with Nestjs')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:4000/termsofservice')
    .setLicense('MIT License', '')
    .addServer('http://localhost:4000')
    // ✅ Add Bearer Auth configuration
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'bearer-auth', // This name should match the name used in @ApiBearerAuth()
    )
    // Cookie Authentication (if we're also using cookies)
    .addCookieAuth('accessToken', {
      type: 'apiKey',
      in: 'cookie',
      name: 'accessToken',
      description: 'Access token stored in cookie',
    })
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, documentFactory);

  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.getOrThrow('appConfig.awsAccessKey'),
      secretAccessKey: configService.getOrThrow('appConfig.awsSecretAccessKey'),
    },
    region: configService.getOrThrow('appConfig.awsRegion'),
  });

  app.setGlobalPrefix('api/v1');
  app.enableCors(corsOptions);
}
