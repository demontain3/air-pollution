import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDataDto } from '../sensor_datas/dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from '../sensor_datas/dto/update-sensor_data.dto';
import {  User } from '@app/common';
import { SensorDataDocument } from '../sensor_datas/entities/sensor_data.entity';
import { SensorDatasRepository } from '../sensor_datas/sensor_datas.repository';
import { BaseService } from 'apps/calibrate/base/calibrate.base.service';
import { DevicesService } from '../device/device.service';
import { DeviceType } from '../device/dto/enum/device-type.enum';
import { PositionDocument } from '../positions/entities/position.entity';
import { Types } from 'mongoose';

@Injectable()
export class SensorDatasService extends BaseService<
  SensorDataDocument,
  SensorDatasRepository
> {
  constructor(
    private readonly sensorDatasRepository: SensorDatasRepository,
    private readonly devicesService: DevicesService,
  ) {
    super(sensorDatasRepository);
  }

  async create(
    createSensorDataDto: CreateSensorDataDto,
  ): Promise<SensorDataDocument> {
    const { deviceId, ...rest } = createSensorDataDto;
    const device = await this.devicesService.findOneBySerialNo(deviceId);
    if (!device) {
      throw new NotFoundException(`Device with serialNo ${deviceId} not found`);
    }
    const sensorData = new SensorDataDocument();
    Object.assign(sensorData, rest);
    sensorData.device = device;
    //If device is stationery set timestamp to current time
    if (device.type === DeviceType.STATIONERY) {
      sensorData.timestamp === new Date();
    }
    return this.sensorDatasRepository.create(sensorData);
  }

  async findAll(): Promise<{ data: SensorDataDocument[]; total: number }> {
    const result = await this.sensorDatasRepository.find({
    });
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: string): Promise<SensorDataDocument> {
    const sensorData = await this.sensorDatasRepository.findOne({ _id: id });
    if (!sensorData) {
      throw new NotFoundException(`SensorData with ID ${id} not found`);
    }
    return sensorData;
  }

  async findOneBySerialNo(serialNo: string): Promise<SensorDataDocument> {
    const sensorData = await this.sensorDatasRepository.findOne({
      device: { serialNo: serialNo },
    });
    if (!sensorData) {
      throw new NotFoundException(
        `SensorData with SerialNo ${serialNo} not found`,
      );
    }
    return sensorData;
  }

  async update(
    id: string,
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

  async remove(id: string): Promise<void> {
    const sensorData = await this.findOne(id);
    await this.sensorDatasRepository.findOneAndDelete(sensorData);
  }
}
