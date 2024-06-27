import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreatePositionDto } from '../../positions/dto/create-position.dto';
import { KeiType } from './enums/kei.enum';

export class CreateSensorDataDto {
  @ApiProperty({ description: 'The key of the sensor data', example: KeiType.PM })
  @IsEnum(KeiType, { message: 'Key must be a valid KeiType' })
  @IsOptional({ message: 'Key is optional' }) // Key is optional based on the schema
  kei: KeiType;

  @ApiProperty({ description: 'The timestamp of the position', example: '2022-03-01T10:00:00Z' })
  // @IsDate({ message: 'Timestamp must be a date' })
  @IsNotEmpty({ message: 'Timestamp is required' })
  timestamp: Date;

  @ApiProperty({ description: 'The id of the device' })
  @IsString({ message: 'Device id must be a string' })
  @IsOptional({ message: 'Device id is required' })
  deviceId: string;

  @ApiProperty({ description: 'The id of the user' })
  @IsNumber({},{ message: 'User id must be a string' })
  @IsOptional({ message: 'User id is required' })
  userId: number;

  @ApiProperty({ description: 'The value of the sensor' ,example:'32'})
  @IsNumber({},{ message: 'Value must be a number' })
  @IsNotEmpty({ message: 'Value is required' })
  value: number;

  @ApiProperty({ description: 'The position data of the sensor' })
  @IsOptional({ message: 'Position data is required' })
  positionDto: CreatePositionDto;
}