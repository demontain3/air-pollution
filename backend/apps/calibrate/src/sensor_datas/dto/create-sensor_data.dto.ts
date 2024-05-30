import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDataDto {
  @ApiProperty({ description: 'The key of the sensor data' })
  @IsString({ message: 'Key must be a string' })
  @IsOptional({ message: 'Key is required' })
  kei: string;

  @ApiProperty({ description: 'The PM of the sensor data' })
  @IsNumber({},{ message: 'PM must be a number' })
  @IsNotEmpty({ message: 'PM is required' })
  pm: number;

  @ApiProperty({ description: 'The Temperature of the sensor data' })
  @IsNumber({},{ message: 'Temperature must be a number' })
  @IsNotEmpty({ message: 'Temperature is required' })
  temperature: number;

  @ApiProperty({ description: 'The humidity of the sensor data' })
  @IsNumber({},{ message: 'humidity must be a number' })
  @IsNotEmpty({ message: 'Humidity is required' })
  humidity: number;

  @ApiProperty({ description: 'The timestamp of the sensor data' })
  @IsString({ message: 'Timestamp must be a string' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: string;

  @ApiProperty({ description: 'The owner of the device' })
  @IsNumber({},{ message: 'Device owner must be a number' })
  @IsNotEmpty({ message: 'Device owner is required' })
  device_owner: number;
}