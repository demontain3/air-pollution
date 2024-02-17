import { IsString } from "class-validator";

export class createNotificationsDto{
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  subject: string;
}