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

@Injectable()
export class RoutesService extends BaseService<
  RouteDocument,
  RoutesRepository
> {
  constructor(private readonly routesRepository: RoutesRepository) {
    super(routesRepository);
  }

  async create(
    createRouteDto: CreateRouteDto,
    user: User,
  ): Promise<RouteDocument> {
    const route = new RouteDocument();
    Object.assign(route, createRouteDto);
    /* only for test */
    if (!user) {
      route.owner = 1;
    } else {
      route.owner = user.id;
    }
    return await this.routesRepository.create(route);
  }

  async findAll(
    options: ExtendedFindOptions<RouteDocument>,
  ): Promise<{ data: RouteDocument[]; total: number }> {
    const result = await this.routesRepository.find(options.query);
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: number): Promise<RouteDocument> {
    const route = await this.routesRepository.findOne({ id });
    if (!route) {
      throw new NotFoundException(`RouteDocument with ID ${id} not found`);
    }
    return route;
  }

  async update(
    id: number,
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

  async remove(id: number): Promise<void> {
    const route = await this.findOne(id);
    if (!route) {
      throw new NotFoundException(`RouteDocument with ID ${id} not found`);
    }
    await this.routesRepository.findOneAndDelete({ id });
  }

  // async findAllWithFilters(
  //   queryParams: QueryParams = {},
  // ): Promise<{ data: RouteDocument[]; total: number }> {
  //   let {
  //     page = 1,
  //     limit = 10,
  //     sortBy = 'id',
  //     sortOrder = 'asc',
  //     owner,
  //     filters = [],
  //   } = queryParams;
  //   console.log(filters)
  //   let customFilters = {};

  //   if (filters && typeof filters === 'string') {
  //     filters = [filters];
  //   }
  //   if (filters && filters.length) {
  //     filters.forEach((filter: string) => {
  //       const [key, operatorValue] = filter.split('=');
  //       const [operator, value] = operatorValue.split('_');
  //       customFilters = { ...customFilters, ...processOperator(operator, value, key) };
  //     });
  //   }
  //   const options = {
  //     sort: { [sortBy]: sortOrder === 'desc' ? -1 : 1 },
  //     skip: (parseInt(String(page), 10) - 1) * parseInt(String(limit), 10),
  //     limit: parseInt(String(limit), 10),
  //     populate: 'owner', // Example of population, adjust as needed
  //     customFilters: customFilters, // Pass additional filters to repository
  //   };
  //   const filterQuery = { ...customFilters, ...(owner ? { owner } : {}) }; // Example filter, adjust as needed

  //   const result = await this.routesRepository.getAll(filterQuery, options);
  //   const { data, total } = result;
  //   return { data, total };
  // }
}
