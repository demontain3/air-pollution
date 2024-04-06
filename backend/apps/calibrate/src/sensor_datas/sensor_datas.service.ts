import { Injectable } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';

@Injectable()
export class SensorDatasService {
  create(createSensorDataDto: CreateSensorDataDto) {
    return 'This action adds a new sensorData';
  }

  findAll() {
    return `This action returns all sensorDatas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensorData`;
  }

  update(id: number, updateSensorDataDto: UpdateSensorDataDto) {
    return `This action updates a #${id} sensorData`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensorData`;
  }
}
