import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  CreatePositionDto,
  CreatePositionWithSensorDataDto,
} from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { PositionDocument } from './entities/position.entity';
import { PositionsRepository } from './positions.repository';
import { RoutesService } from '../routes/routes.service';
import { SensorDataDocument } from '../sensor_datas/entities/sensor_data.entity';
import { BaseService } from 'apps/calibrate/base/calibrate.base.service';
import { SensorDatasRepository } from '../sensor_datas/sensor_datas.repository';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class PositionsService extends BaseService<
  PositionDocument,
  PositionsRepository
> {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly positionsRepository: PositionsRepository,
    private readonly sensorDatasRepository: SensorDatasRepository,
    private readonly routesService: RoutesService,
  ) {
    super(positionsRepository);
  }

  async create(
    createPositionDto: CreatePositionDto,
  ): Promise<PositionDocument> {
    const { routeId, ...rest } = createPositionDto;
    const position = new PositionDocument();
    Object.assign(position, rest);
    if (routeId) {
      const route = await this.routesService.findOne(routeId);
      if (!route) {
        throw new BadRequestException(`Route with ID ${routeId} not found`);
      }
      position.route = route;
    }
    return await this.positionsRepository.create(position);
  }

  async findAll(): Promise<{ data: PositionDocument[]; total: number }> {
    const result = await this.positionsRepository.find({
    });
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: string): Promise<PositionDocument> {
    const position = await this.positionsRepository.findOne({ id });
    if (!position) {
      throw new NotFoundException(`PositionDocument with ID ${id} not found`);
    }
    return position;
  }

  async update(
    id: string,
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

    await this.positionsRepository.findOneAndUpdate(
      { id: position._id },
      position,
    );
    return position;
  }

  async remove(id: string): Promise<void> {
    const position = await this.findOne(id);
    if (!position) {
      throw new NotFoundException(`PositionDocument with ID ${id} not found`);
    }
    await this.positionsRepository.findOneAndDelete({ id });
  }

  // async createPositionWithSensorData(
  //   createPositionWithSensorDataDto: CreatePositionWithSensorDataDto,
  // ): Promise<{ sensorData: sensorData }> {
  //   const session = await this.connection.startSession();
  //   session.startTransaction();
  //   try {
  //     const { routeId, sensorData, ...positionDto } =
  //       createPositionWithSensorDataDto;

  //     let route = null;
  //     if (routeId) {
  //       route = await this.routesService.findOne(routeId);
  //       if (!route) {
  //         throw new BadRequestException(`Route with ID ${routeId} not found`);
  //       }
  //     }

  //     const position = new PositionDocument();
  //     Object.assign(position, positionDto);
  //     if (route) {
  //       position.route = route;
  //     }

  //     const createdPosition = await this.positionsRepository.create(position, {
  //       session,
  //     });

  //     const sensorDataDoc = new SensorDataDocument(createPositionWithSensorDataDto.sensorData);
  //     Object.assign(sensorDataDoc, sensorData);
  //     sensorDataDoc.position = createdPosition;

  //     const createdSensorData = await this.sensorDatasRepository.create(
  //       sensorDataDoc,
  //       { session },
  //     );

  //     await session.commitTransaction();
  //     return { sensorData: createdSensorData };
  //   } catch (error) {
  //     await session.abortTransaction();
  //     throw error;
  //   } finally {
  //     session.endSession();
  //   }
  // }

  async createPositionWithSensorData(
    createPositionWithSensorDataDto: CreatePositionWithSensorDataDto,
  ): Promise<{ sensorData: SensorDataDocument[] }> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const { routeId, sensorData, ...positionDto } =
        createPositionWithSensorDataDto;
  
      let route = null;
      if (routeId) {
        route = await this.routesService.findOne(routeId);
        if (!route) {
          throw new BadRequestException(`Route with ID ${routeId} not found`);
        }
      }
  
      const position = new PositionDocument();
      Object.assign(position, positionDto);
      if (route) {
        position.route = route;
      }
  
      const createdPosition = await this.positionsRepository.create(position, {
        session,
      });
  
      const createdSensorData = await Promise.all(
        createPositionWithSensorDataDto.sensorData.map(async (data) => {
          console.log("data",data)
          data.position = createdPosition;
          const sensorDataDoc = await this.sensorDatasRepository.create(data, {
            session,
          });
          console.log(sensorDataDoc,'doc')
          return sensorDataDoc;
        }),
      );
  
      await session.commitTransaction();
      return { sensorData: createdSensorData };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
