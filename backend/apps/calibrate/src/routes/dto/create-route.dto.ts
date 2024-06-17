import { IsNotEmpty, IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
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

  // @ApiProperty({ description: 'The completion status of the route', example: false })
  // @IsBoolean({ message: 'Complete must be a boolean' })
  // @IsOptional({ message: 'Complete is required' })
  // complete: boolean;

  @ApiProperty({ description: 'The owner of the route', example: 1 })
  @IsNumber({},{ message: 'Owner must be a number' })
  @IsNotEmpty({ message: 'Owner is required' })
  owner: number;

  @ApiProperty({ description: 'The description of the route', example: 'This is a sample route' })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}