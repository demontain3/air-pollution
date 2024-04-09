import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Route } from './entities/route.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoutesRepository } from './routes.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Route]),
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
  controllers: [RoutesController],
  providers: [RoutesService, RoutesRepository],
  exports: [RoutesService, RoutesRepository],
})
export class RoutesModule {}