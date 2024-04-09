import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Position } from './entities/position.entity';
import { RoutesModule } from '../routes/routes.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PositionsRepository } from './positions.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Position]),
    RoutesModule,
    ConfigModule.forRoot({
      isGlobal: true,}),
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
  controllers: [PositionsController],
  providers: [PositionsService, PositionsRepository],
})
export class PositionsModule {}
