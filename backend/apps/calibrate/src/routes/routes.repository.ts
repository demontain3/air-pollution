import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RouteDocument } from './entities/route.entity';
import { AbstractRepository } from 'apps/calibrate/database/abstract.repository';

@Injectable()
export class RoutesRepository extends AbstractRepository<RouteDocument> {
  protected readonly logger = new Logger(RoutesRepository.name);

  constructor(
    @InjectModel(RouteDocument.name)
    routesModel: Model<RouteDocument>,
  ) {
    super(routesModel);
  }
}
