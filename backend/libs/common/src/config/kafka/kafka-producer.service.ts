import { Injectable } from '@nestjs/common';
import sendMessage from './producer';

@Injectable()
export class KafkaProducerService {
  async send(topic: string, message: any) {
    await sendMessage(topic, message);
  }
}