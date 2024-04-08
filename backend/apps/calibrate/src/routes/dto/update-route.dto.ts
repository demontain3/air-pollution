import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
export class UpdateRouteDto {
    @IsString()
    @IsOptional()
    start?: string;
  
    @IsString()
    @IsOptional()
    finish?: string;
  
    @IsBoolean()
    @IsOptional()
    complete?: boolean;
  
    @IsNumber()
    @IsOptional()
    owner?: number;
  }