import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { PositionsModule } from './positions/positions.module';
import { SensorDatasModule } from './sensor_datas/sensor_datas.module';
import { CALIBRATE_SERVICE, LoggerModule } from '@app/common';
// import { RouteSchema } from './routes/schemas/route.schema';
// import { SensorDataSchema } from './sensor_datas/schemas/sensor_data.schema';
// import { PositionSchema } from './positions/schemas/position.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
    RoutesModule,
    PositionsModule,
    SensorDatasModule,
  ],
  providers: [],
})
export class CalibrateModule {}
