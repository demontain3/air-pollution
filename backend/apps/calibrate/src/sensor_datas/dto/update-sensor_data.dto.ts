import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UpdateSensorDataDto {
    @ApiPropertyOptional({ description: 'The key of the sensor data' })
    @IsString({ message: 'Key must be a string' })
    @IsOptional()
    kei?: string;
  
    @ApiProperty({ description: 'The pm of the sensor data' })
    @IsNumber({},{ message: 'PM must be a number' })
    @IsOptional({ message: 'PM is required' })
    pm?: number;
  
    @ApiProperty({ description: 'The temperature of the sensor data' })
    @IsNumber({},{ message: 'Temperature must be a number' })
    @IsOptional({ message: 'Value is required' })
    temperature?: number;
  
    @ApiProperty({ description: 'The humidity of the sensor data' })
    @IsNumber({},{ message: 'humidity must be a number' })
    @IsOptional({ message: 'humidity is required' })
    humidity?: number;

    @ApiPropertyOptional({ description: 'The timestamp of the sensor data' })
    @IsString({ message: 'Timestamp must be a string' })
    @IsOptional()
    timestamp?: string;
  
    @ApiPropertyOptional({ description: 'The owner of the device' })
    @IsNumber({},{ message: 'Device owner must be a number' })
    @IsOptional()
    device_owner?: number;
}