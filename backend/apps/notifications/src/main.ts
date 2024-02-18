import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host:'0.0.0.0',
      port: configService.get('TCP_PORT')
    }
  })
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  await app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
