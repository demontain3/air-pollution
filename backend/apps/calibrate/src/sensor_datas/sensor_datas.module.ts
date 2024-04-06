import { Module } from '@nestjs/common';
import { SensorDatasService } from './sensor_datas.service';
import { SensorDatasController } from './sensor_datas.controller';

@Module({
  controllers: [SensorDatasController],
  providers: [SensorDatasService],
})
export class SensorDatasModule {}
