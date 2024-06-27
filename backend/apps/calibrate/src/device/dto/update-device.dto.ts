import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { DeviceType } from '../dto/enum/device-type.enum';
import { CreatePositionDto } from '../../positions/dto/create-position.dto';

export class UpdateDeviceDto {
  @ApiProperty({
    description: 'The new serial number of the device',
    example: '1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  serialNo?: string;

  @ApiProperty({
    description: 'The new type of the device',
    enum: DeviceType,
    example: DeviceType.STATIONERY,
    required: false,
  })
  @IsEnum(DeviceType)
  @IsOptional()
  type?: DeviceType;

  @ApiProperty({ description: 'The value to calibrate error' })
  @IsNumber({},{ message: 'Calibrate Value must be a number' })
  @IsOptional({ message: 'Calibrate Value is optional' })
  calibrateValue: number;

  @ApiProperty({ description: 'The position data of the sensor' })
  @IsOptional({ message: 'Position data is required' })
  positionDto: CreatePositionDto;
}

export class UpdateDeviceOwnerDto {
  @ApiProperty({
    description: 'The new owner of the device',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsOptional()
  owner?: number;
}
