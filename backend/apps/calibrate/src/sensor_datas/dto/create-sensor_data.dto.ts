import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDataDto {
  @ApiProperty({ description: 'The key of the sensor data' })
  @IsString({ message: 'Key must be a string' })
  @IsNotEmpty({ message: 'Key is required' })
  kei: string;

  @ApiProperty({ description: 'The value of the sensor data' })
  @IsNumber({},{ message: 'Value must be a number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @ApiProperty({ description: 'The timestamp of the sensor data' })
  @IsString({ message: 'Timestamp must be a string' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: string;

  @ApiProperty({ description: 'The owner of the device' })
  @IsNumber({},{ message: 'Device owner must be a number' })
  @IsNotEmpty({ message: 'Device owner is required' })
  device_owner: number;
}