import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';
import { DeviceDocument } from './entities/device.entity';

@Injectable()
export class DevicesRepository extends AbstractRepository<DeviceDocument> {
  protected readonly logger = new Logger(DevicesRepository.name);

  constructor(
    @InjectModel(DeviceDocument.name)
    deviceModel: Model<DeviceDocument>,
  ) {
    super(deviceModel);
  }
}
