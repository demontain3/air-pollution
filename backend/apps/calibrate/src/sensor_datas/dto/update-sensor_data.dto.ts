import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
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

    @ApiPropertyOptional({ description: 'The position of the sensor data', type: String })
    @IsOptional()
    position?: Types.ObjectId; // Added position field based on the schema
}