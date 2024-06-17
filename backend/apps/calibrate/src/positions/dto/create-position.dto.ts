import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSensorDataDto } from '../../sensor_datas/dto/create-sensor_data.dto';

export class CreatePositionDto {
    @ApiProperty({ description: 'The latitude of the position', example: 51.678418 })
    @IsNumber({},{ message: 'Latitude must be a number' })
    @IsNotEmpty({ message: 'Latitude is required' })
    lati: number;
  
    @ApiProperty({ description: 'The longitude of the position', example: 7.809007 })
    @IsNumber({}, {message: 'Longitude must be a number' })
    @IsNotEmpty({ message: 'Longitude is required' })
    lngi: number;
  
    @ApiProperty({ description: 'The altitude of the position', example: 300 })
    @IsNumber({},{ message: 'Altitude must be a number' })
    @IsOptional({ message: 'Altitude is optional' })
    alti: number;
  
    @ApiProperty({ description: 'The timestamp of the position', example: '2022-03-01T10:00:00Z' })
    @IsDate({ message: 'Timestamp must be a date' })
    @IsNotEmpty({ message: 'Timestamp is required' })
    timestamp: Date;

    @ApiProperty({ description: 'The ID of the route', example: 1 })
    @IsNumber({},{ message: 'Route ID must be a number' })
    @IsNotEmpty({ message: 'Route ID is required' })
    routeId: number;

    // @ApiProperty({ description: 'The details of sensor data' })
    // @IsOptional()
    // sensorData: CreateSensorDataDto;
}