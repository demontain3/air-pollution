import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorDatasService } from './sensor_datas.service';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';

@Controller('sensor-datas')
export class SensorDatasController {
  constructor(private readonly sensorDatasService: SensorDatasService) {}

  @Post()
  create(@Body() createSensorDataDto: CreateSensorDataDto) {
    return this.sensorDatasService.create(createSensorDataDto);
  }

  @Get()
  findAll() {
    return this.sensorDatasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorDatasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDataDto: UpdateSensorDataDto) {
    return this.sensorDatasService.update(+id, updateSensorDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDatasService.remove(+id);
  }
}
