import { IsNotEmpty, IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreatePositionDto {
    @IsNumber()
    @IsNotEmpty()
    lati: number;
  
    @IsNumber()
    @IsNotEmpty()
    lngi: number;
  
    @IsNumber()
    @IsNotEmpty()
    alti: number;
  
    @IsString()
    @IsNotEmpty()
    timestamp: string;

    @IsNumber()
    @IsNotEmpty()
    routeId: number;
  }