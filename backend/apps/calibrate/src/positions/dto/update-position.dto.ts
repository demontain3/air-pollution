import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePositionDto {
    @ApiPropertyOptional({ description: 'The latitude of the position' })
    @IsNumber({},{ message: 'Latitude must be a number' })
    @IsOptional()
    lati?: number;
  
    @ApiPropertyOptional({ description: 'The longitude of the position' })
    @IsNumber({},{ message: 'Longitude must be a number' })
    @IsOptional()
    lngi?: number;
  
    @ApiPropertyOptional({ description: 'The altitude of the position' })
    @IsNumber({},{ message: 'Altitude must be a number' })
    @IsOptional()
    alti?: number;
  
    @ApiPropertyOptional({ description: 'The timestamp of the position' })
    @IsString({ message: 'Timestamp must be a string' })
    @IsOptional()
    timestamp?: string;
}