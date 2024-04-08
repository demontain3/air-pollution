import { IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateSensorDataDto {
    @IsOptional()
    @IsString()
    kei?: string;
  
    @IsOptional()
    @IsNumber()
    value?: number;
  
    @IsOptional()
    @IsString()
    timestamp?: string;
  
    @IsOptional()
    @IsNumber()
    device_owner?: number;
  }