import { Module } from '@nestjs/common';
import { DevicesService } from './device.service';
import { DevicesController } from './device.controller';
import { AUTH_SERVICE, LoggerModule } from '@app/common';
import { RoutesModule } from '../routes/routes.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevicesRepository } from './device.repository';
import { DeviceDocument, DeviceSchema } from './entities/device.entity';
import { DatabaseModule } from 'apps/calibrate/database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: DeviceDocument.name, schema: DeviceSchema },
    ]),
    RoutesModule,
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
  controllers: [DevicesController],
  providers: [DevicesService, DevicesRepository],
  exports: [DevicesService, DevicesRepository]
})
export class DevicesModule {}
