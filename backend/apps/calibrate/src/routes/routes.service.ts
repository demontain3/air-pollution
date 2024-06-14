import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { Route } from './entities/route.entity';
import { RoutesRepository } from './routes.repository';

@Injectable()
export class RoutesService {
  constructor(private readonly routesRepository: RoutesRepository) {}

  // async create(createRouteDto: CreateRouteDto, user: User): Promise<Route> {
  //   if (!createRouteDto || !user) {
  //     throw new BadRequestException('Invalid data provided');
  //   }
  //   const route = new Route({ ...createRouteDto, owner: user.id });
  //   return this.routesRepository.create(route);
  // }

  // async findAll(
  //   options: ExtendedFindOptions<Route>,
  // ): Promise<{ data: Route[]; total: number }> {
  //   if (!options) {
  //     throw new BadRequestException('Invalid options provided');
  //   }
  //   const result = await this.routesRepository.findAll(options);
  //   const data = result.data;
  //   const total = result.total;
  //   return { data, total };
  // }

  // async findOne(id: number): Promise<Route> {
  //   if (!id) {
  //     throw new BadRequestException('Invalid ID provided');
  //   }
  //   const route = await this.routesRepository.findOne({ id });
  //   if (!route) {
  //     throw new NotFoundException(`Route with ID ${id} not found`);
  //   }
  //   return route;
  // }

  // async update(id: number, updateRouteDto: UpdateRouteDto): Promise<Route> {
  //   if (!id || !updateRouteDto) {
  //     throw new BadRequestException('Invalid data provided');
  //   }
  //   const route = await this.findOne(id);
  //   if (updateRouteDto.start !== undefined) {
  //     route.start = updateRouteDto.start;
  //   }
  //   if (updateRouteDto.finish !== undefined) {
  //     route.finish = updateRouteDto.finish;
  //   }
  //   if (updateRouteDto.complete !== undefined) {
  //     route.complete = updateRouteDto.complete;
  //   }
  //   return this.routesRepository.findOneAndUpdate({where:{id:id}},route);
  // }

  // async remove(id: number): Promise<void> {
  //   if (!id) {
  //     throw new BadRequestException('Invalid ID provided');
  //   }
  //   const route = await this.findOne(id);
  //   if(!route){
  //     throw new NotFoundException(`Route with ID ${id} not found`);
  //   }
  //   await this.routesRepository.findOneAndDelete({id:route.id});
  // }
}