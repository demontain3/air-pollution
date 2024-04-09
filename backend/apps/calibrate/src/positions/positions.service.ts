import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { Position } from './entities/position.entity';
import { PositionsRepository } from './positions.repository';
import { RoutesService } from '../routes/routes.service';

@Injectable()
export class PositionsService {
  constructor(
    private readonly positionsRepository: PositionsRepository,
    private readonly routesService: RoutesService,
  ) {}

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const route = await this.routesService.findOne(createPositionDto.routeId);
    if (!route) {
      throw new BadRequestException(`Route with ID ${createPositionDto.routeId} not found`);
    }
    const position = new Position({ ...createPositionDto });
    position.route = route;
    return this.positionsRepository.create(position);
  }

  async findAll(
    options: ExtendedFindOptions<Position>,
  ): Promise<{ data: Position[]; total: number }> {
    const result = await this.positionsRepository.findAll(options);
    const data = result.data;
    const total = result.total;
    return { data, total };
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.positionsRepository.findOne({ id });
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    return position;
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
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
      { where: { id: position.id } },
      position,
    );
    return position;
  }

  async remove(id: number): Promise<void> {
    const position = await this.findOne(id);
    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
    await this.positionsRepository.findOneAndDelete(position);
  }
}