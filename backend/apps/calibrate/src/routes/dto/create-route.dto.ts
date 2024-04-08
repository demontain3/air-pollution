import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  start: string;

  @IsString()
  @IsNotEmpty()
  finish: string;

  @IsBoolean()
  @IsNotEmpty()
  complete: boolean;

  @IsNumber()
  @IsNotEmpty()
  owner: number;
}