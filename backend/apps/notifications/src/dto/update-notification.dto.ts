import { IsOptional, IsString } from 'class-validator';

export class updateNotificationsDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  subject?: string;
}
