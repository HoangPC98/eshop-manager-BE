import { HttpException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './interceptors/exeption.filter';
import { TransResponseInterceptor } from './interceptors/response.interceptor';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });


  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransResponseInterceptor())

  await app.listen(process.env.SERVER_POST || 8000);
}
bootstrap();
