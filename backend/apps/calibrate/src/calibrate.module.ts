import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { PositionsModule } from './positions/positions.module';
import { SensorDatasModule } from './sensor_datas/sensor_datas.module';
import { CALIBRATE_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Route } from './routes/entities/route.entity';
import { SensorData } from './sensor_datas/entities/sensor_data.entity';
import { Position } from './positions/entities/position.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Route, SensorData, Position]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/calibrate/.env',
    }),
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
    RoutesModule, PositionsModule, SensorDatasModule
  ],
  providers: [],
})
export class CalibrateModule {}
