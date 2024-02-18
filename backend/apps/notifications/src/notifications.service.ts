import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { createNotificationsDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { otpEmailDto, resetPasswordEmailDto } from './dto/email.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly configService: ConfigService,
  ) {}

  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  async create(createNotificationsDto: createNotificationsDto) {
    const notification = new Notification(createNotificationsDto);
    return await this.notificationsRepository.create(notification);
  }

  async update(id: number, updateNotificationsDto: createNotificationsDto) {
    return this.notificationsRepository.findOneAndUpdate(
      { id },
      updateNotificationsDto,
    );
  }

  async delete(id: number) {
    return this.notificationsRepository.findOneAndDelete({ id });
  }

  async findAll() {
    return this.notificationsRepository.findAll({});
  }

  async getOne(id: number) {
    return this.notificationsRepository.findOne({ id });
  }

  private async sendEmail(notificationEmaildto: NotifyEmailDto, email: string) {
    const notification = this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: notificationEmaildto.subject,
      text: notificationEmaildto.message,
    });
    return notification;
  }

  async sendOtpVerifyEmail(
    { email, otp }: otpEmailDto,
    id: number,
  ): Promise<Notification | boolean> {
    const notification = await this.notificationsRepository.findOne({ id: id });
    if (!notification) return false;
    notification.message = notification.message.replace('temporary', otp);
    console.log(notification);
    await this.sendEmail(notification, email);
  }

  async sendResetPasswordEmail(
    { email, link }: resetPasswordEmailDto,
    id: number,
  ): Promise<Notification | boolean> {
    const notification = await this.notificationsRepository.findOne({ id: id });
    if (!notification) return false;
    notification.message = notification.message.replace('temporary', link);
    console.log(notification);
    await this.sendEmail(notification, email);
  }
}
