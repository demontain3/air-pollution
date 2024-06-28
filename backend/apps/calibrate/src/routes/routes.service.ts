import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { RouteDocument } from './entities/route.entity';
import { RoutesRepository } from './routes.repository';
import { BaseService } from 'apps/calibrate/base/calibrate.base.service';
import { PopulateOptions } from 'apps/calibrate/database/abstract.repository';
import { KafkaProducerService } from '@app/common/config/kafka/kafka-producer.service';
import startSparkStream from '@app/common/config/spark/spark-stream';

@Injectable()
export class RoutesService extends BaseService<
  RouteDocument,
  RoutesRepository
> {
  constructor(
    private readonly routesRepository: RoutesRepository,
    private readonly kafkaProducerService: KafkaProducerService,
  ) {
    super(routesRepository);
  }

  // async create(
  //   createRouteDto: CreateRouteDto,
  //   user: User,
  // ): Promise<RouteDocument> {
  //   const route = new RouteDocument();
  //   Object.assign(route, createRouteDto);
  //   /* only for test */
  //   if (!user) {
  //     route.owner = 1;
  //   } else {
  //     route.owner = user.id;
  //   }
  //   return await this.routesRepository.create(route);
  // }

  async create(createRouteDto: CreateRouteDto, user: User): Promise<RouteDocument> {
    const route = new RouteDocument();
    Object.assign(route, createRouteDto);
    route.owner = user ? user.id : 1;
    const createdRoute = await this.routesRepository.create(route);
    await this.kafkaProducerService.send('routes_topic', createdRoute); // Kafka event

    // Trigger Spark Streaming for Processing
    startSparkStream('routes');

    return createdRoute;
  }

  async findAll(
  ): Promise<{ data: RouteDocument[]; total: number }> {
    const result = await this.routesRepository.find({});
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: string): Promise<RouteDocument> {
    const route = await this.routesRepository.findOne({_id: id});
    if (!route) {
      throw new NotFoundException(`RouteDocument with ID ${id} not found`);
    }
    return route;
  }

  async update(
    id: string,
    updateRouteDto: UpdateRouteDto,
  ): Promise<RouteDocument> {
    const route = await this.findOne(id);

    if (updateRouteDto.start !== undefined) {
      route.start = updateRouteDto.start;
    }
    if (updateRouteDto.finish !== undefined) {
      route.finish = updateRouteDto.finish;
    }
    if (updateRouteDto.complete !== undefined) {
      route.complete = updateRouteDto.complete;
    }

    await this.routesRepository.findOneAndUpdate({ id: route._id }, route);
    return route;
  }

  async remove(id: string): Promise<void> {
    const route = await this.findOne(id);
    if (!route) {
      throw new NotFoundException(`RouteDocument with ID ${id} not found`);
    }
    await this.routesRepository.findOneAndDelete({ id });
  }

}
