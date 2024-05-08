import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty({ description: 'The start of the route' })
  @IsString({ message: 'Start must be a string' })
  @IsNotEmpty({ message: 'Start is required' })
  start: string;

  @ApiProperty({ description: 'The finish of the route' })
  @IsString({ message: 'Finish must be a string' })
  @IsNotEmpty({ message: 'Finish is required' })
  finish: string;

  @ApiProperty({ description: 'The completion status of the route' })
  @IsBoolean({ message: 'Complete must be a boolean' })
  @IsNotEmpty({ message: 'Complete is required' })
  complete: boolean;

  @ApiProperty({ description: 'The owner of the route' })
  @IsNumber({},{ message: 'Owner must be a number' })
  @IsNotEmpty({ message: 'Owner is required' })
  owner: number;
}