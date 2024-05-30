import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationsDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { otpEmailDto, resetPasswordEmailDto } from './dto/email.dto';
import { UpdateNotificationsDto } from './dto/update-notification.dto';
import { template } from 'lodash';

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

  async create(createNotificationsDto: CreateNotificationsDto) {
    const notification = new Notification(createNotificationsDto);
    return await this.notificationsRepository.create(notification);
  }

  async update(id: number, updateNotificationsDto: UpdateNotificationsDto) {
    return this.notificationsRepository.findOneAndUpdate(
      { where:{ id:id }},
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
    try{
      const notification = this.transporter.sendMail({
        from: this.configService.get('SMTP_USER'),
        to: email,
        subject: notificationEmaildto.subject,
        text: notificationEmaildto.message,
      });
      return notification;
    }
    catch(e){
      console.log("email sent fail")
    }

  }

  
  async sendOtpVerifyEmail(
    data: otpEmailDto,
    id: number,
  ): Promise<Notification | boolean> {
    try{
      const notification = await this.notificationsRepository.findOne({ id: id });
      if (!notification) return false;
      notification.message = template(notification.message)({
        value: data.otpCode,
      });
      // notification.html_content = template(notification.html_content)({
      //   value: data.otpCode,
      // });
      if (!(await this.sendEmail(notification, data.email))) {
        throw new Error('Email not sent');
      }
    }
    catch(e: any){
      console.log("error is"+e)
    }
  }

  async sendResetPasswordEmail(
    data: resetPasswordEmailDto,
    id: number,
  ): Promise<Notification | boolean> {
    const notification = await this.notificationsRepository.findOne({ id: id });
    if (!notification) return false;
    notification.message = template(notification.message)({
      value: data.resetPasswordUrl,
    });
    // notification.html_content = template(notification.html_content)({
    //   value: data.resetPasswordUrl,
    // });
    if (!(await this.sendEmail(notification, data.email))) {
      throw new Error('Email not sent');
    }
  }
}
