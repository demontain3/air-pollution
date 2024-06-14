import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class otpEmailDto {
  @ApiProperty({ description: 'The email to send the OTP to.', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The OTP code.', example: '123456' })
  @IsNotEmpty({ message: 'OTP code is required'})
  @IsString({ message: 'OTP code must be a string'})
  otpCode: string;
}

export class resetPasswordEmailDto {
  @ApiProperty({ description: 'The email to send the reset password link to.', example: 'user@example.com' })
  @IsNotEmpty({ message: 'Email is required'})
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The reset password URL.', example: 'localhost:3000/reset-password?myresetpassurl' })
  @IsNotEmpty({ message: 'Reset password URL is required'})
  @IsString({ message: 'Reset password URL must be a string'})
  resetPasswordUrl: string;
}