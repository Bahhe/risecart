import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport, RmqContext } from '@nestjs/microservices';
import { CommonServiceInterface } from '../interfaces/common.service.interface';

@Injectable()
export class CommonService implements CommonServiceInterface {
  constructor(private readonly configService: ConfigService) {}
  getRmqOptions(queue: string, noAck: boolean): RmqOptions {
    const USER = this.configService.get('RABBITMQ_USER');
    const PASSOWRD = this.configService.get('RABBITMQ_PASS');
    const HOST = this.configService.get('RABBITMQ_HOST');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSOWRD}@${HOST}`],
        noAck,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
