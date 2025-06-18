import { NestFactory } from '@nestjs/core';
import { appCreate } from 'src/app.create';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appCreate(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
