import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PositionDocument } from './entities/position.entity';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';

@Injectable()
export class PositionsRepository extends AbstractRepository<PositionDocument> {
  protected readonly logger = new Logger(PositionsRepository.name);

  constructor(
    @InjectModel(PositionDocument.name)
    positionsModel: Model<PositionDocument>,
  ) {
    super(positionsModel);
  }
}
