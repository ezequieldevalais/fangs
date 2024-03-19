import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //TODO: enable only for front
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
