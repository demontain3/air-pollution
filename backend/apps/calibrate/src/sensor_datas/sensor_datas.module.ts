import { Module } from '@nestjs/common';
import { SensorDatasService } from './sensor_datas.service';
import { SensorDatasController } from './sensor_datas.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { SensorData } from './entities/sensor_data.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SensorDatasRepository } from './sensor_datas.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([SensorData]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
    LoggerModule,
  ],
  controllers: [SensorDatasController],
  providers: [SensorDatasService, SensorDatasRepository],
})
export class SensorDatasModule {}