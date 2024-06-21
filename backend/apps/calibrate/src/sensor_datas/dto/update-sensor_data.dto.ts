import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UpdateSensorDataDto {
    @ApiPropertyOptional({ description: 'The key of the sensor data' })
    @IsString({ message: 'Key must be a string' })
    @IsOptional()
    kei?: string;

    @ApiProperty({ description: 'The value of the sensor' })
    @IsNumber({},{ message: 'Value must be a number' })
    @IsOptional({ message: 'Value is required' })
    value: number;

    @ApiPropertyOptional({ description: 'The position of the sensor data', type: String })
    @IsOptional()
    position?: Types.ObjectId; // Added position field based on the schema
}