import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { AUTH_SERVICE, LoggerModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoutesRepository } from './routes.repository';
import { DatabaseModule } from 'apps/calibrate/database/database.module';
import { Route, RouteSchema } from './entities/route.entity';

@Module({
  imports: [
    // DatabaseModule.forFeature([{ name: Route.name, schema: RouteSchema }]),
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
