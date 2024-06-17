import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';
import { SensorDataDocument } from './entities/sensor_data.entity';

@Injectable()
export class SensorDatasRepository extends AbstractRepository<SensorDataDocument> {
  protected readonly logger = new Logger(SensorDatasRepository.name);
  constructor(
    @InjectModel(SensorDataDocument.name)
    sensorDataModel: Model<SensorDataDocument>,
  ) {
    super(sensorDataModel);
  }
}

