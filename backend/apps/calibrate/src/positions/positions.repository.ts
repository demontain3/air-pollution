import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Position } from './entities/position.entity';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';

@Injectable()
export class PositionsRepository extends AbstractRepository<Position> {
  protected readonly logger = new Logger(PositionsRepository.name);

  constructor(
    @InjectModel(Position.name)
    positionsModel: Model<Position>,
  ) {
    super(positionsModel);
  }
}
