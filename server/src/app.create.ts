import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import helmet from 'helmet';
import { corsOptions } from './config/cors-options';

export function appCreate(app: INestApplication): void {
  app.use(helmet());

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
    .setTitle('Blog App Api')
    .setDescription('This is blog app built with Nestjs')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000/termsofservice')
    .setLicense('MIT License', '')
    .addServer('http://localhost:3000')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

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
