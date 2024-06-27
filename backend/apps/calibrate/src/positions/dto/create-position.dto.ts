import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSensorDataDto } from '../../sensor_datas/dto/create-sensor_data.dto';

export class CreatePositionDto {
  @ApiProperty({ description: 'The latitude of the position', example: 51.678418 })
  @IsNumber({}, { message: 'Latitude must be a number' })
  @IsNotEmpty({ message: 'Latitude is required' })
  lati: number;

  @ApiProperty({ description: 'The longitude of the position', example: 7.809007 })
  @IsNumber({}, { message: 'Longitude must be a number' })
  @IsNotEmpty({ message: 'Longitude is required' })
  lngi: number;

  @ApiProperty({ description: 'The altitude of the position', example: 300 })
  @IsNumber({}, { message: 'Altitude must be a number' })
  @IsOptional()
  alti: number;

  @ApiProperty({ description: 'The ID of the route', example: '60d2e446cfb4b200242bd1bf' })
  @IsString({ message: 'Route ID must be a string' })
  @IsOptional({ message: 'Route ID is optional' })
  routeId: string;
}

export class CreatePositionWithSensorDataDto extends CreatePositionDto {
  @ApiProperty({ description: 'The sensor data of the position' ,  example:  [
    {
      "kei": "00",
      "timestamp": "2022-03-01T10:00:00Z",
      "userId": 1,
      "value": 25.6
    },{
      "kei": "01",
      "timestamp": "2022-03-01T10:00:00Z",
      "userId": 1,
      "value": 25.6
    }
  ]})
  @IsNotEmpty({ message: 'Sensor data is required' })
  sensorData: CreateSensorDataDto[];
}

