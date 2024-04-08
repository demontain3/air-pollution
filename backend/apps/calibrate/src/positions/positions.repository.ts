import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionsRepository extends AbstractRepository<Position> {
  protected readonly logger = new Logger(PositionsRepository.name);
  constructor(
    @InjectRepository(Position)
    positionsRepository: Repository<Position>,
    entityManager: EntityManager,
  ) {
    super(positionsRepository, entityManager);
  }
}
