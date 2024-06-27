import { IsNumber, IsString, IsOptional, IsDate, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { KeiType } from './enums/kei.enum';

export class UpdateSensorDataDto {
    @ApiProperty({ description: 'The key of the sensor data', example: KeiType.Type00 })
    @IsEnum(KeiType, { message: 'Key must be a valid KeiType' })
    @IsOptional({ message: 'Key is optional' }) // Key is optional based on the schema
    kei: KeiType;

    @ApiProperty({ description: 'The value of the sensor' })
    @IsNumber({},{ message: 'Value must be a number' })
    @IsOptional({ message: 'Value is required' })
    value: number;

    @ApiPropertyOptional({ description: 'The position of the sensor data', type: String })
    @IsOptional()
    position?: Types.ObjectId; // Added position field based on the schema
}