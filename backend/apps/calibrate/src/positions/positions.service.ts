import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { PositionDocument } from './entities/position.entity';
import { PositionsRepository } from './positions.repository';
import { RoutesService } from '../routes/routes.service';
import { CreateSensorDataDto } from '../sensor_datas/dto/create-sensor_data.dto';
import { SensorDataDocument } from '../sensor_datas/entities/sensor_data.entity';

@Injectable()
export class PositionsService {
  constructor(
    private readonly positionsRepository: PositionsRepository,
    private readonly routesService: RoutesService,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<PositionDocument> {
    const {routeId, ...rest} = createPositionDto;
    const route = await this.routesService.findOne(routeId);
    if (!route) {
      throw new BadRequestException(`Route with ID ${routeId} not found`);
    }
    const position = new PositionDocument();
    Object.assign(position, rest);
    position.route = route;
    return await this.positionsRepository.create(position);
  }

  async findAll(
    options: ExtendedFindOptions<PositionDocument>,
  ): Promise<{ data: PositionDocument[]; total: number }> {
    const result = await this.positionsRepository.find(options.query);
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: number): Promise<PositionDocument> {
    const position = await this.positionsRepository.findOne({ id });
    if (!position) {
      throw new NotFoundException(`PositionDocument with ID ${id} not found`);
    }
    return position;
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<PositionDocument> {
    const position = await this.findOne(id);

    if (updatePositionDto.lati !== undefined) {
      position.lati = updatePositionDto.lati;
    }
    if (updatePositionDto.lngi !== undefined) {
      position.lngi = updatePositionDto.lngi;
    }
    if (updatePositionDto.alti !== undefined) {
      position.alti = updatePositionDto.alti;
    }
    if (updatePositionDto.timestamp !== undefined) {
      position.timestamp = updatePositionDto.timestamp;
    }

    await this.positionsRepository.findOneAndUpdate(
      { id: position._id },
      position,
    );
    return position;
  }

  async remove(id: number): Promise<void> {
    const position = await this.findOne(id);
    if (!position) {
      throw new NotFoundException(`PositionDocument with ID ${id} not found`);
    }
    await this.positionsRepository.findOneAndDelete({ id });
  }
}