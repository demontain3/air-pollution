import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRouteDto {
    @ApiPropertyOptional({ description: 'The start of the route' })
    @IsString({ message: 'Start must be a string' })
    @IsOptional()
    start?: string;
  
    @ApiPropertyOptional({ description: 'The finish of the route' })
    @IsString({ message: 'Finish must be a string' })
    @IsOptional()
    finish?: string;
  
    @ApiPropertyOptional({ description: 'The completion status of the route' })
    @IsBoolean({ message: 'Complete must be a boolean' })
    @IsOptional()
    complete?: boolean;
  
    @ApiPropertyOptional({ description: 'The owner of the route' })
    @IsNumber({},{ message: 'Owner must be a number' })
    @IsOptional()
    owner?: number;
}