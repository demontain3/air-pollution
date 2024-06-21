import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({ description: 'The start of the route', example: 'Start Point' })
  @IsString({ message: 'Start must be a string' })
  @IsNotEmpty({ message: 'Start is required' })
  start: string;

  @ApiProperty({ description: 'The finish of the route', example: 'Finish Point' })
  @IsString({ message: 'Finish must be a string' })
  @IsNotEmpty({ message: 'Finish is required' })
  finish: string;

  // Description is optional
  @ApiProperty({ description: 'The description of the route', example: 'This is a sample route' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
