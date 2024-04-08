import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { SensorData } from './entities/sensor_data.entity';

@Injectable()
export class SensorDatasRepository extends AbstractRepository<SensorData> {
  protected readonly logger = new Logger(SensorDatasRepository.name);
  constructor(
    @InjectRepository(SensorData)
    sensorDatasRepository: Repository<SensorData>,
    entityManager: EntityManager,
  ) {
    super(sensorDatasRepository, entityManager);
  }
}
