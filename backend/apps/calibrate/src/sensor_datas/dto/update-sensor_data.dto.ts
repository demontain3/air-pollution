import { PartialType } from '@nestjs/swagger';
import { CreateSensorDataDto } from './create-sensor_data.dto';

export class UpdateSensorDataDto extends PartialType(CreateSensorDataDto) {}
