import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePositionDto {
    @ApiProperty({ description: 'The latitude of the position' })
    @IsNumber({},{ message: 'Latitude must be a number' })
    @IsNotEmpty({ message: 'Latitude is required' })
    lati: number;
  
    @ApiProperty({ description: 'The longitude of the position' })
    @IsNumber({}, {message: 'Longitude must be a number' })
    @IsNotEmpty({ message: 'Longitude is required' })
    lngi: number;
  
    @ApiProperty({ description: 'The altitude of the position' })
    @IsNumber({},{ message: 'Altitude must be a number' })
    @IsNotEmpty({ message: 'Altitude is required' })
    alti: number;
  
    @ApiProperty({ description: 'The timestamp of the position' })
    @IsString({ message: 'Timestamp must be a string' })
    @IsNotEmpty({ message: 'Timestamp is required' })
    timestamp: string;

    @ApiProperty({ description: 'The ID of the route' })
    @IsNumber({},{ message: 'Route ID must be a number' })
    @IsNotEmpty({ message: 'Route ID is required' })
    routeId: number;
}