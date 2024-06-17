import { Module } from '@nestjs/common';
import { PositionsModule } from './positions/positions.module';
import { SensorDatasModule } from './sensor_datas/sensor_datas.module';
import { CALIBRATE_SERVICE, LoggerModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../database/database.module';
import * as Joi from 'joi';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/calibrate/.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        TCP_PORT: Joi.number().required(),
        HTTP_PORT: Joi.number().required()
      }),
    }),
    
    DatabaseModule,
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: CALIBRATE_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('NOTIFICATIONS_HOST'),
            port: configService.get('NOTIFICATIONS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    SensorDatasModule,
    RoutesModule,
    PositionsModule,
  ],
  providers: [],
})
export class CalibrateModule {}
