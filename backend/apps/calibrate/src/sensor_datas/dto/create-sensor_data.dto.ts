import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSensorDataDto {
  @IsString()
  @IsNotEmpty()
  kei: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsNotEmpty()
  device_owner: number;
}