import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePositionDto {
    @IsNumber()
    @IsOptional()
    lati?: number;
  
    @IsNumber()
    @IsOptional()
    lngi?: number;
  
    @IsNumber()
    @IsOptional()
    alti?: number;
  
    @IsString()
    @IsOptional()
    timestamp?: string;
  

  }