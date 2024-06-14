import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';
import { SensorData } from './entities/sensor_data.entity';

@Injectable()
export class SensorDatasRepository extends AbstractRepository<SensorData> {
  protected readonly logger = new Logger(SensorDatasRepository.name);

  constructor(
    @InjectModel(SensorData.name)
    sensorDatasModel: Model<SensorData>,
  ) {
    super(sensorDatasModel);
  }
}

