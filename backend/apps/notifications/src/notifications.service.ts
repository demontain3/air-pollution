import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { createNotificationsDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async create(createNotificationsDto: createNotificationsDto) {
      const notification = new Notification(createNotificationsDto);
      return await this.notificationsRepository.create(notification); 
  }

  async update(id: number,  updateNotificationsDto: createNotificationsDto) {
    return this.notificationsRepository.findOneAndUpdate({ id }, updateNotificationsDto)
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
  
}
