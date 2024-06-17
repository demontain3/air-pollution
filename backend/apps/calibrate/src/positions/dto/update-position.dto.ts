import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePositionDto {
    @ApiPropertyOptional({ description: 'The latitude of the position', example: 51.678418 })
    @IsNumber({},{ message: 'Latitude must be a number' })
    @IsOptional()
    lati?: number;
  
    @ApiPropertyOptional({ description: 'The longitude of the position', example: 7.809007 })
    @IsNumber({},{ message: 'Longitude must be a number' })
    @IsOptional()
    lngi?: number;
  
    @ApiPropertyOptional({ description: 'The altitude of the position', example: 300 })
    @IsNumber({},{ message: 'Altitude must be a number' })
    @IsOptional()
    alti?: number;
  
    @ApiPropertyOptional({ description: 'The timestamp of the position', example: '2022-03-01T10:00:00Z' })
    @IsString({ message: 'Timestamp must be a string' })
    @IsOptional()
    timestamp?: Date;
}