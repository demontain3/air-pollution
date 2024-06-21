import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreatePositionDto } from '../../positions/dto/create-position.dto';

export class CreateSensorDataDto {
  @ApiProperty({ description: 'The key of the sensor data' })
  @IsString({ message: 'Key must be a string' })
  @IsOptional({ message: 'Key is optional' }) // Key is optional based on the schema
  kei: string;

  @ApiProperty({ description: 'The timestamp of the position', example: '2022-03-01T10:00:00Z' })
  // @IsDate({ message: 'Timestamp must be a date' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: Date;

  @ApiProperty({ description: 'The id of the device' })
  @IsString({ message: 'Device id must be a string' })
  @IsNotEmpty({ message: 'Device id is required' })
  deviceId: string;

  @ApiProperty({ description: 'The value of the sensor' })
  @IsNumber({},{ message: 'Value must be a number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @ApiProperty({ description: 'The position data of the sensor' })
  @IsOptional({ message: 'Position data is required' })
  positionDto: CreatePositionDto;
}