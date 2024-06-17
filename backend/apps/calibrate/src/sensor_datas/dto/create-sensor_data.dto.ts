import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class CreateSensorDataDto {
  @ApiProperty({ description: 'The key of the sensor data' })
  @IsString({ message: 'Key must be a string' })
  @IsOptional({ message: 'Key is optional' }) // Key is optional based on the schema
  kei: string;

  @ApiProperty({ description: 'The timestamp of the sensor data' })
  @IsString({ message: 'Timestamp must be a string' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: string;

  @ApiProperty({ description: 'The owner of the device' })
  @IsNumber({},{ message: 'Device owner must be a number' })
  @IsNotEmpty({ message: 'Device owner is required' })
  device_owner: number;

  @ApiProperty({ description: 'The position of the sensor data', type: String })
  @IsNotEmpty({ message: 'Position is required' })
  position: Types.ObjectId; // Added position field based on the schema
}