import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Notification } from './entities/notification.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Notification]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/notifications/.env',
      validationSchema: Joi.object({
          PORT : Joi.number().required(),
          SMTP_USER: Joi.string().required(),
          GOOGLE_OAUTH_CLIENT_ID: Joi.string().required(),
          GOOGLE_OAUTH_CLIENT_SECRET: Joi.string().required(),
          GOOGLE_OAUTH_REFRESH_TOKEN: Joi.string().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
        name:AUTH_SERVICE,
        useFactory: (configService : ConfigService) => ({
          transport: Transport.TCP,
          options:{
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT')
          }
        }),
        inject: [ConfigService]
      }
    ]),
    LoggerModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
