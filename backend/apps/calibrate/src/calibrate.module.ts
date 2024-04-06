import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { PositionsModule } from './positions/positions.module';
import { SensorDatasModule } from './sensor_datas/sensor_datas.module';


@Module({
  controllers: [],
  providers: [],
  imports: [RoutesModule, PositionsModule, SensorDatasModule],
})
export class CalibrateModule {}
