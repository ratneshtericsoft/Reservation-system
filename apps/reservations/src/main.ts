import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser'
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({whitelist : true}))
  app.useLogger(app.get(Logger))
  app.use(cookieParser())
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
