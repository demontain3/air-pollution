import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Route } from './entities/route.entity';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';

@Injectable()
export class RoutesRepository extends AbstractRepository<Route> {
  protected readonly logger = new Logger(RoutesRepository.name);

  constructor(
    @InjectModel(Route.name)
    routesModel: Model<Route>,
  ) {
    super(routesModel);
  }
}
