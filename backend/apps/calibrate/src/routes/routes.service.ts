import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { Route } from './entities/route.entity';
import { RoutesRepository } from './routes.repository';

@Injectable()
export class RoutesService {
  constructor(private readonly routesRepository: RoutesRepository) {}

  async create(createRouteDto: CreateRouteDto, user: User): Promise<Route> {
    const route = new Route({ ...createRouteDto, owner: user.id });
    return this.routesRepository.create(route);
  }

  async findAll(
    options: ExtendedFindOptions<Route>,
  ): Promise<{ data: Route[]; total: number }> {
    const result = await this.routesRepository.findAll(options);
    const data = result.data;
    const total = result.total;
    return { data, total };
  }

  async findOne(id: number): Promise<Route> {
    const route = await this.routesRepository.findOne({ id });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
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
    return this.routesRepository.findOneAndUpdate({where:{id:id}},route);
  }

  async remove(id: number): Promise<void> {
    const route = await this.findOne(id);
    if(!route){
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    await this.routesRepository.findOneAndDelete(route);
  }
}
