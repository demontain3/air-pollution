import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { createNotificationsDto } from './dto/create-notification.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { otpEmailDto, resetPasswordEmailDto } from './dto/email.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  async create(@Body() createNotificationsDto: createNotificationsDto) {
    return await this.notificationsService.create(createNotificationsDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateNotificationsDto: createNotificationsDto,
  ) {
    return this.notificationsService.update(id, updateNotificationsDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    return this.notificationsService.delete(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param('id') id: number) {
    return this.notificationsService.getOne(id);
  }

  @EventPattern('send_otp')
  async handleSendOtpVerifyEmail(@Payload() data: otpEmailDto) {
    this.notificationsService.sendOtpVerifyEmail(data, 1);
  }

  @EventPattern('send_reset_password')
  async handleSendResetPasswordEmail(@Payload() data: resetPasswordEmailDto) {
    this.notificationsService.sendResetPasswordEmail(data, 2);
  }
}
