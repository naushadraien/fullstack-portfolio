import { NestFactory } from '@nestjs/core';
import { appCreate } from 'src/app.create';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  appCreate(app);

  await app.listen(port);
  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
