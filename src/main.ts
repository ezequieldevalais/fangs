import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import { AppModule } from './app.module';

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

  app.use(
    session({
      resave: true,
      //saveUnitialized: false,
      name: 'session',
      secret: '128h38q21h38',
      cookie: {
        secure: false,
      },
    }),
  );

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
