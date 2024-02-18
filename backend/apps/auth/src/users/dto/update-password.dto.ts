import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsStrongPassword()
  oldPassword: string;

  @IsStrongPassword()
  newPassword: string;

  @IsStrongPassword()
  confirmedNewPassword: string;
}
