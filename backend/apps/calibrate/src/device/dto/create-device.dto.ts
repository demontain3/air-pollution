import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DeviceType } from '../dto/enum/device-type.enum';
import { CreatePositionDto } from '../../positions/dto/create-position.dto';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'The serial number of the device',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  serialNo: string;

  @ApiProperty({
    description: 'The type of the device',
    enum: DeviceType,
    example: DeviceType.MOBILE,
  })
  @IsEnum(DeviceType)
  @IsNotEmpty()
  type: DeviceType;

  @ApiProperty({
    description: 'The owner of the device',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  owner?: number;

  @ApiProperty({ description: 'The value to calibrate error' })
  @IsNumber({},{ message: 'Calibrate Value must be a number' })
  @IsOptional({ message: 'Calibrate Value is optional' })
  calibrateValue: number;

  @ApiProperty({ description: 'The position data of the sensor' })
  @IsOptional({ message: 'Position data is required' })
  positionDto: CreatePositionDto;
}