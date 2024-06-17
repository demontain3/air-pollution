import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateSensorDataDto {
    @ApiPropertyOptional({ description: 'The key of the sensor data' })
    @IsString({ message: 'Key must be a string' })
    @IsOptional()
    kei?: string;

    @ApiPropertyOptional({ description: 'The timestamp of the sensor data' })
    @IsString({ message: 'Timestamp must be a string' })
    @IsOptional()
    timestamp?: string;
  
    @ApiPropertyOptional({ description: 'The owner of the device' })
    @IsNumber({},{ message: 'Device owner must be a number' })
    @IsOptional()
    device_owner?: number;

    @ApiProperty({ description: 'The value of the sensor' })
    @IsNumber({},{ message: 'Value must be a number' })
    @IsOptional({ message: 'Value is required' })
    value: number;

    @ApiPropertyOptional({ description: 'The position of the sensor data', type: String })
    @IsOptional()
    position?: Types.ObjectId; // Added position field based on the schema
}