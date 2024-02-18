import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser, User } from '@app/common';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @Post('request-otp')
  async requestOtpVerify(@Body('email') email: string): Promise<boolean> {
    return this.authService.requestOtpVerify(email);
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body('otpCode') otpCode: string,
    @Body('email') email: string,
  ): Promise<boolean> {
    return this.authService.verifyOtp(otpCode, email);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string): Promise<boolean> {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ): Promise<boolean> {
    return this.authService.resetPassword(token, password);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return 'Logged out';
  }
}
