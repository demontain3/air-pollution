import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDataDto } from '../sensor_datas/dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from '../sensor_datas/dto/update-sensor_data.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { SensorDataDocument } from '../sensor_datas/entities/sensor_data.entity';
import { SensorDatasRepository } from '../sensor_datas/sensor_datas.repository';
import { BaseService } from 'apps/calibrate/base/calibrate.base.service';

@Injectable()
export class SensorDatasService extends BaseService<
SensorDataDocument,
SensorDatasRepository
>{
  constructor(
    private readonly sensorDatasRepository: SensorDatasRepository,
  ) {
    super(sensorDatasRepository);

  }

  async create(createSensorDataDto: CreateSensorDataDto, user: User): Promise<SensorDataDocument> {
    const sensorData = new SensorDataDocument();
    Object.assign(sensorData, createSensorDataDto);
    sensorData.device_owner = user.id;
    return this.sensorDatasRepository.create(sensorData);
  }

  async findAll(
    options: ExtendedFindOptions<SensorDataDocument>,
  ): Promise<{ data: SensorDataDocument[]; total: number }> {
    const result = await this.sensorDatasRepository.find(options.query);
    const data = result;
    const total = result.length;
    return { data, total };
  }


  async findOne(id: number): Promise<SensorDataDocument> {
    const sensorData = await this.sensorDatasRepository.findOne({ id });
    if (!sensorData) {
      throw new NotFoundException(`SensorData with ID ${id} not found`);
    }
    return sensorData;
  }

  async update(
    id: number,
    updateSensorDataDto: UpdateSensorDataDto,
  ): Promise<SensorDataDocument> {
    const sensorData = await this.findOne(id);
    if (updateSensorDataDto.kei !== undefined) {
      sensorData.kei = updateSensorDataDto.kei;
    }
    return this.sensorDatasRepository.findOneAndUpdate(
      { where: { id: sensorData._id } },
      updateSensorDataDto,
    );
  }

  async remove(id: number): Promise<void> {
    const sensorData = await this.findOne(id);
    await this.sensorDatasRepository.findOneAndDelete(sensorData);
  }
}