import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';
import { ExtendedFindOptions, User } from '@app/common';
import { SensorData } from './entities/sensor_data.entity';
import { SensorDatasRepository } from './sensor_datas.repository';

@Injectable()
export class SensorDatasService {
  constructor(private readonly sensorDatasRepository: SensorDatasRepository) {}

  // async create(
  //   createSensorDataDto: CreateSensorDataDto,
  //   user: User,
  // ): Promise<SensorData> {
  //   const sensorData = new SensorData({
  //     ...createSensorDataDto,
  //     device_owner: user.id,
  //   });
  //   return this.sensorDatasRepository.create(sensorData);
  // }

  // async findAll(
  //   options: ExtendedFindOptions<SensorData>,
  // ): Promise<{ data: SensorData[]; total: number }> {
  //   const result = await this.sensorDatasRepository.findAll(options);
  //   const data = result.data;
  //   const total = result.total;
  //   return { data, total };
  // }

  // async findOne(id: number): Promise<SensorData> {
  //   const sensorData = await this.sensorDatasRepository.findOne({ id });
  //   if (!sensorData) {
  //     throw new NotFoundException(`SensorData with ID ${id} not found`);
  //   }
  //   return sensorData;
  // }

  // // async update(
  // //   id: number,
  // //   updateSensorDataDto: UpdateSensorDataDto,
  // // ): Promise<SensorData> {
  // //   const sensorData = await this.findOne(id);
  // //   if (updateSensorDataDto.kei !== undefined) {
  // //     sensorData.kei = updateSensorDataDto.kei;
  // //   }
  // //   return this.sensorDatasRepository.findOneAndUpdate(
  // //     { where: { id: sensorData.id } },
  // //     updateSensorDataDto,
  // //   );
  // // }

  // async remove(id: number): Promise<void> {
  //   const sensorData = await this.findOne(id);
  //   await this.sensorDatasRepository.findOneAndDelete(sensorData);
  // }
}
