import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Route } from './entities/route.entity';

@Injectable()
export class RoutesRepository extends AbstractRepository<Route> {
  protected readonly logger = new Logger(RoutesRepository.name);
  constructor(
    @InjectRepository(Route)
    routesRepository: Repository<Route>,
    entityManager: EntityManager,
  ) {
    super(routesRepository, entityManager);
  }
}
