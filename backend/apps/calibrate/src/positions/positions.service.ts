import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { CreatePositionDto } from './dto/create-position.dto';
// import { UpdatePositionDto } from './dto/update-position.dto';
// import { ExtendedFindOptions, User } from '@app/common';
// import { Position } from './entities/position.entity';
import { PositionsRepository } from './positions.repository';
import { RoutesService } from '../routes/routes.service';
// import { CreateSensorDataDto } from '../sensor_datas/dto/create-sensor_data.dto';
// import { SensorData } from '../sensor_datas/entities/sensor_data.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class PositionsService {
  // constructor(
  //   // private readonly positionsRepository: PositionsRepository,
  //   // private readonly routesService: RoutesService,
  //   // private manager: EntityManager,

  // ) {}

  // async create(createPositionDto: CreatePositionDto): Promise<Position> {
  //   return this.manager.transaction(async manager => {
  //     const { sensorData, ...positionData } = createPositionDto;

  //     const route = await this.routesService.findOne(createPositionDto.routeId);
  //     if (!route) {
  //       throw new BadRequestException(`Route with ID ${createPositionDto.routeId} not found`);
  //     }

  //     const position = new Position({ ...positionData });
  //     position.route = route;

  //     const savedPosition = await manager.save(position);

  //     const finalSensorData = new SensorData({ ...sensorData });
  //     finalSensorData.position = savedPosition;

  //     await manager.save(finalSensorData);

  //     return savedPosition;
  //   });
  // }

  // async findAll(
  //   options: ExtendedFindOptions<Position>,
  // ): Promise<{ data: Position[]; total: number }> {
  //   const result = await this.positionsRepository.findAll(options);
  //   const data = result.data;
  //   const total = result.total;
  //   return { data, total };
  // }

  // async findOne(id: number): Promise<Position> {
  //   const position = await this.positionsRepository.findOne({ id });
  //   if (!position) {
  //     throw new NotFoundException(`Position with ID ${id} not found`);
  //   }
  //   return position;
  // }

  // async update(
  //   id: number,
  //   updatePositionDto: UpdatePositionDto,
  // ): Promise<Position> {
  //   const position = await this.findOne(id);

  //   if (updatePositionDto.lati !== undefined) {
  //     position.lati = updatePositionDto.lati;
  //   }
  //   if (updatePositionDto.lngi !== undefined) {
  //     position.lngi = updatePositionDto.lngi;
  //   }
  //   if (updatePositionDto.alti !== undefined) {
  //     position.alti = updatePositionDto.alti;
  //   }
  //   if (updatePositionDto.timestamp !== undefined) {
  //     position.timestamp = updatePositionDto.timestamp;
  //   }

  //   await this.positionsRepository.findOneAndUpdate(
  //     { where: { id: position.id } },
  //     position,
  //   );
  //   return position;
  // }

  // async remove(id: number): Promise<void> {
  //   const position = await this.findOne(id);
  //   if (!position) {
  //     throw new NotFoundException(`Position with ID ${id} not found`);
  //   }
  //   await this.positionsRepository.findOneAndDelete(position);
  // }
}